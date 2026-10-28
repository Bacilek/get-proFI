import { isDone } from './prereq'
import type { GlobalId, LessonProgress, Module } from './types'

export interface ModuleStats {
  id: string
  title: string
  total: number
  done: number
  /** Average stars (0-3) over finished lessons; null when none are finished. */
  avgStars: number | null
}

export interface CourseStats {
  total: number
  done: number
  /** Total stars earned / total stars possible, 0-1. */
  starShare: number
  modules: ModuleStats[]
}

export function courseStats(modules: readonly Module[], progress: ReadonlyMap<GlobalId, LessonProgress>): CourseStats {
  const per = modules.map((m): ModuleStats => {
    const done = m.lessons.filter((l) => isDone(progress.get(l.id)))
    const stars = done.reduce((s, l) => s + (progress.get(l.id)?.stars ?? 0), 0)
    return { id: m.id, title: m.title, total: m.lessons.length, done: done.length, avgStars: done.length ? stars / done.length : null }
  })
  const total = per.reduce((s, m) => s + m.total, 0)
  const stars = modules.flatMap((m) => m.lessons).reduce((s, l) => s + (progress.get(l.id)?.stars ?? 0), 0)
  return {
    total,
    done: per.reduce((s, m) => s + m.done, 0),
    starShare: total ? stars / (total * 3) : 0,
    modules: per,
  }
}
