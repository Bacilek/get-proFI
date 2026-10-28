import { useLiveQuery } from 'dexie-react-hooks'
import { courseSlug } from './content'
import { db } from './core/db'
import type { Course, LessonProgress, MilestoneResult } from './core/types'

/** Milestone results of one course keyed by the *local* milestone id. */
export function useCourseResults(course: Course): ReadonlyMap<string, MilestoneResult> {
  const rows = useLiveQuery(() => db.results.toArray(), [])
  const prefix = `${courseSlug(course)}:`
  const map = new Map<string, MilestoneResult>()
  for (const r of rows ?? []) {
    if (r.milestoneId.startsWith(prefix)) map.set(r.milestoneId.slice(prefix.length), r)
  }
  return map
}

/** Lesson progress of all courses keyed by global lesson id. */
export function useLessonProgress(): ReadonlyMap<string, LessonProgress> {
  const rows = useLiveQuery(() => db.lessons.toArray(), [])
  return new Map((rows ?? []).map((r) => [r.lessonId, r]))
}

export function setLessonStars(lessonId: string, stars: LessonProgress['stars']): Promise<unknown> {
  return db.lessons.put({ lessonId, stars, updatedAt: Date.now() })
}
