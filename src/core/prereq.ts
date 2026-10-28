import type { GlobalId, LessonMeta, LessonProgress } from './types'

export type LessonStatus = 'locked' | 'available' | 'done'

export interface LessonState {
  status: LessonStatus
  /** Unfinished prerequisites (empty unless locked). */
  missing: GlobalId[]
}

/** A lesson counts as done once it has at least one star. */
export function isDone(p: LessonProgress | undefined): boolean {
  return (p?.stars ?? 0) >= 1
}

/**
 * Locking is advisory: a locked lesson can still be opened, the UI just explains
 * which prerequisites are missing. Unknown prerequisite ids are treated as missing.
 */
export function lessonState(
  lesson: LessonMeta,
  progress: ReadonlyMap<GlobalId, LessonProgress>,
): LessonState {
  if (isDone(progress.get(lesson.id))) return { status: 'done', missing: [] }
  const missing = lesson.prerequisites.filter((id) => !isDone(progress.get(id)))
  return missing.length > 0
    ? { status: 'locked', missing }
    : { status: 'available', missing: [] }
}

/** Throws on prerequisite cycles; returns lessons in a valid study order. */
export function studyOrder(lessons: readonly LessonMeta[]): LessonMeta[] {
  const byId = new Map(lessons.map((l) => [l.id, l]))
  const state = new Map<GlobalId, 'visiting' | 'done'>()
  const out: LessonMeta[] = []
  const visit = (l: LessonMeta, path: GlobalId[]) => {
    const s = state.get(l.id)
    if (s === 'done') return
    if (s === 'visiting') throw new Error(`Prerequisite cycle: ${[...path, l.id].join(' -> ')}`)
    state.set(l.id, 'visiting')
    for (const pid of l.prerequisites) {
      const dep = byId.get(pid)
      if (dep) visit(dep, [...path, l.id])
    }
    state.set(l.id, 'done')
    out.push(l)
  }
  for (const l of lessons) visit(l, [])
  return out
}
