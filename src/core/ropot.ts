import type { ChoiceQuestion } from './questions'
import { GENERATORS, shuffle, type Level, type Rng } from './ropotGen'

export const ROPOT_SIZE = 4
export const ROPOT_SECONDS = 6 * 60
export const CORRECT_POINTS = 0.5
export const WRONG_POINTS = -0.25

export type RoundLevel = 'easy' | 'mixed' | 'hard'

/** Points of one round: +0.5 per correct, -0.25 per wrong, 0 for unanswered (like the real ROPOT). */
export function scoreRound(questions: readonly ChoiceQuestion[], answers: readonly (number | null)[]): number {
  return questions.reduce((sum, q, i) => {
    const a = answers[i]
    return sum + (a === null || a === undefined ? 0 : a === q.answer ? CORRECT_POINTS : WRONG_POINTS)
  }, 0)
}

export interface AuthoredChoice {
  question: ChoiceQuestion
  lecture: number
  lessonId: string
}

export interface RoundQuestion {
  question: ChoiceQuestion
  lecture: number
  /** Authored questions keep their lesson; generated ones have none. */
  lessonId?: string
}

/** Easy = tagged easy; hard = tagged hard or untagged; mixed = everything. */
const inLevel = (q: ChoiceQuestion, level: RoundLevel) =>
  level === 'mixed' || (level === 'easy' ? q.difficulty === 'easy' : q.difficulty !== 'easy')

/** Draws a round: about half generated (fresh numbers each time), the rest from the authored bank, no repeats. */
export function drawRound(
  authored: readonly AuthoredChoice[],
  lectures: readonly number[],
  level: RoundLevel,
  r: Rng,
  size = ROPOT_SIZE,
): RoundQuestion[] {
  const bank = shuffle(r, authored.filter((a) => lectures.includes(a.lecture) && inLevel(a.question, level)))
  const gens = shuffle(r, GENERATORS.filter((g) => lectures.includes(g.lecture)))
  const out: RoundQuestion[] = []
  while (out.length < size && (bank.length > 0 || gens.length > 0)) {
    const useGen = gens.length > 0 && (bank.length === 0 || r() < 0.5)
    if (useGen) {
      const g = gens.pop()!
      const lvl: Level = level === 'mixed' ? (r() < 0.5 ? 'easy' : 'hard') : level
      out.push({ question: g.make(r, lvl), lecture: g.lecture })
    } else {
      const a = bank.pop()!
      out.push({ question: a.question, lecture: a.lecture, lessonId: a.lessonId })
    }
  }
  return shuffle(r, out)
}

/** Lectures that have anything to ask (authored choice questions or a generator). */
export function availableLectures(authored: readonly AuthoredChoice[]): number[] {
  const set = new Set<number>([...authored.map((a) => a.lecture), ...GENERATORS.map((g) => g.lecture)])
  return [...set].sort((a, b) => a - b)
}
