import { useLiveQuery } from 'dexie-react-hooks'
import { courseSlug, resultId } from './content'
import { db } from './core/db'
import { isDue, newReview, review } from './core/srs'
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

/** Records one answered question. */
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

/** Records an attempt and schedules the question for spaced repetition (a miss resets it, a hit advances it). */
export async function recordAnswer(a: Omit<Attempt, 'id' | 'at'>): Promise<void> {
  await recordAttempt(a)
  const now = Date.now()
  const state = (await db.reviews.get(a.questionId)) ?? newReview(a.questionId, now)
  await db.reviews.put(review(state, a.correct ? 'good' : 'again', now))
}

/** Question ids (`<course>:<id>`) whose review is due, oldest first. */
/** Undefined while loading. */
export function useDueReviews(now: number): string[] | undefined {
  const rows = useLiveQuery(() => db.reviews.where('due').belowOrEqual(now).sortBy('due'), [now])
  return rows?.filter((r) => isDue(r, now)).map((r) => r.questionId)
}

/** Keys (see `skipKey`) of weekly materials the user declared as not existing. */
export function useSkips(): ReadonlySet<string> {
  const rows = useLiveQuery(() => db.skips.toArray(), [])
  return new Set((rows ?? []).map((r) => r.id))
}

export function skipMaterial(key: string): Promise<unknown> {
  return db.skips.put({ id: key, at: Date.now() })
}

/** Sets (or, with `null`, clears) the points of a milestone of `course`. */
export function setMilestonePoints(course: Course, milestoneId: string, points: number | null): Promise<unknown> {
  const id = resultId(course, milestoneId)
  return points === null ? db.results.delete(id) : db.results.put({ milestoneId: id, points, at: Date.now() })
}
