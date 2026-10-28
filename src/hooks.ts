import { useLiveQuery } from 'dexie-react-hooks'
import { courseSlug } from './content'
import { db } from './core/db'
import type { Attempt, Course, LessonProgress, MilestoneResult, TopicRating } from './core/types'

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

export function useTopicRating(topic: string): TopicRating | undefined {
  return useLiveQuery(() => db.ratings.get(topic), [topic])
}

export function setTopicRating(topic: string, rating: TopicRating['rating']): Promise<unknown> {
  return db.ratings.put({ topic, rating, at: Date.now() })
}

/** Records one answered question and, once a practice round is finished, raises (never lowers) the lesson stars. */
export function recordAttempt(a: Omit<Attempt, 'id' | 'at'>): Promise<unknown> {
  return db.attempts.add({ ...a, at: Date.now() })
}

export async function raiseStars(lessonId: string, stars: LessonProgress['stars']): Promise<void> {
  const current = (await db.lessons.get(lessonId))?.stars ?? 0
  if (stars > current) await setLessonStars(lessonId, stars)
}

export function useAttempts(): Attempt[] {
  return useLiveQuery(() => db.attempts.toArray(), []) ?? []
}

export function useRatings(): ReadonlyMap<string, TopicRating> {
  const rows = useLiveQuery(() => db.ratings.toArray(), [])
  return new Map((rows ?? []).map((r) => [r.topic, r]))
}
