import { isDone } from './prereq'
import type { GlobalId, LessonMeta, LessonProgress, Milestone, Module } from './types'

export const NODE_W = 200
export const NODE_H = 62
export const GAP_X = 56
export const GAP_Y = 16

export interface PlacedNode {
  lesson: LessonMeta
  moduleId: string
  layer: number
  x: number
  y: number
}

export interface Edge {
  from: GlobalId
  to: GlobalId
}

export interface RoadmapLayout {
  nodes: PlacedNode[]
  /** Edges between lessons that are both in the layout (cross-course prerequisites are skipped). */
  edges: Edge[]
  width: number
  height: number
}

/**
 * Layered layout: a lesson sits one layer right of its deepest prerequisite.
 * Within a layer lessons keep course order (module order, then position in module).
 */
export function layoutRoadmap(modules: readonly Module[]): RoadmapLayout {
  const all = modules.flatMap((m) => m.lessons.map((lesson) => ({ lesson, moduleId: m.id })))
  const byId = new Map(all.map((e) => [e.lesson.id, e]))
  const layerOf = new Map<GlobalId, number>()
  const resolve = (id: GlobalId, stack: GlobalId[]): number => {
    const known = layerOf.get(id)
    if (known !== undefined) return known
    if (stack.includes(id)) throw new Error(`Prerequisite cycle: ${[...stack, id].join(' -> ')}`)
    const deps = (byId.get(id)?.lesson.prerequisites ?? []).filter((d) => byId.has(d))
    const layer = deps.length === 0 ? 0 : 1 + Math.max(...deps.map((d) => resolve(d, [...stack, id])))
    layerOf.set(id, layer)
    return layer
  }
  const rowsInLayer = new Map<number, number>()
  const nodes: PlacedNode[] = all.map(({ lesson, moduleId }) => {
    const layer = resolve(lesson.id, [])
    const row = rowsInLayer.get(layer) ?? 0
    rowsInLayer.set(layer, row + 1)
    return { lesson, moduleId, layer, x: layer * (NODE_W + GAP_X), y: row * (NODE_H + GAP_Y) }
  })
  const edges = nodes.flatMap((n) =>
    n.lesson.prerequisites.filter((p) => byId.has(p)).map((p) => ({ from: p, to: n.lesson.id })),
  )
  const layers = Math.max(0, ...nodes.map((n) => n.layer)) + 1
  const maxRows = Math.max(0, ...rowsInLayer.values())
  return {
    nodes,
    edges,
    width: layers * NODE_W + (layers - 1) * GAP_X,
    height: maxRows * NODE_H + Math.max(0, maxRows - 1) * GAP_Y,
  }
}

/** Share (0-1) of lessons in the milestone's covered modules that are done; null if it covers none. */
export function readiness(
  milestone: Pick<Milestone, 'coversModules'>,
  modules: readonly Module[],
  progress: ReadonlyMap<GlobalId, LessonProgress>,
): number | null {
  const lessons = modules.filter((m) => milestone.coversModules?.includes(m.id)).flatMap((m) => m.lessons)
  if (lessons.length === 0) return null
  return lessons.filter((l) => isDone(progress.get(l.id))).length / lessons.length
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

export interface MilestoneBadge {
  milestoneId: string
  /** Short label for the corner of a roadmap cell: I, II, ... for midterms, E for the exam. */
  label: string
  title: string
}

/** Short labels of the boss milestones (midterms numbered in order, exam = E), for the legend and cell corners. */
export function milestoneBadges(milestones: readonly Milestone[]): MilestoneBadge[] {
  let midterms = 0
  return milestones.flatMap((m) => {
    if (m.type === 'exam') return [{ milestoneId: m.id, label: 'E', title: m.title }]
    if (m.type === 'midterm') return [{ milestoneId: m.id, label: ROMAN[midterms++] ?? String(midterms), title: m.title }]
    return []
  })
}

/** Module id -> badges of the milestones that cover that module. */
export function badgesByModule(
  milestones: readonly Milestone[],
  badges: readonly MilestoneBadge[],
): Map<string, MilestoneBadge[]> {
  const out = new Map<string, MilestoneBadge[]>()
  for (const b of badges) {
    const m = milestones.find((x) => x.id === b.milestoneId)
    for (const mod of m?.coversModules ?? []) out.set(mod, [...(out.get(mod) ?? []), b])
  }
  return out
}
