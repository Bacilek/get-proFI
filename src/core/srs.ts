import type { ReviewState } from './types'

export const DAY_MS = 86_400_000

export type Grade = 'again' | 'hard' | 'good' | 'easy'

export function newReview(questionId: string, now: number): ReviewState {
  return { questionId, ease: 2.5, interval: 0, reps: 0, due: now }
}

/** SM-2 variant with four grades. */
export function review(state: ReviewState, grade: Grade, now: number): ReviewState {
  if (grade === 'again') {
    return { ...state, reps: 0, interval: 1, ease: Math.max(1.3, state.ease - 0.2), due: now + DAY_MS }
  }
  const ease = Math.max(
    1.3,
    state.ease + (grade === 'easy' ? 0.15 : grade === 'hard' ? -0.15 : 0),
  )
  const reps = state.reps + 1
  let interval: number
  if (reps === 1) interval = grade === 'easy' ? 4 : 1
  else if (reps === 2) interval = grade === 'easy' ? 8 : 3
  else interval = Math.round(state.interval * ease * (grade === 'hard' ? 0.8 : 1))
  return { ...state, ease, reps, interval, due: now + interval * DAY_MS }
}

export function isDue(state: ReviewState, now: number): boolean {
  return state.due <= now
}
