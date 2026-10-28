import type { GlobalId } from './types'

interface QuestionBase {
  /** Unique within the course; stored as `<course>:<id>` in attempts/reviews. */
  id: string
  /** Topic override; defaults to the lesson's first topic. */
  topic?: GlobalId
  /** Markdown with KaTeX. */
  prompt: string
  /** Markdown with KaTeX, shown after answering. */
  solution: string
}

export interface NumericQuestion extends QuestionBase {
  type: 'numeric'
  answer: number
  /** Absolute tolerance, default 1e-6. */
  tolerance?: number
}

export interface ChoiceQuestion extends QuestionBase {
  type: 'choice'
  options: string[]
  /** Index into `options`. */
  answer: number
}

/** Self-graded: the user compares with `solution` and says whether they had it. */
export interface FreeQuestion extends QuestionBase {
  type: 'free'
}

export type Question = NumericQuestion | ChoiceQuestion | FreeQuestion

/** Parses numbers typed by a Czech user: accepts decimal comma, spaces and a few fraction forms ("1/2"). */
export function parseNumber(input: string): number | null {
  const s = input.trim().replace(/\s+/g, '').replace(',', '.')
  if (s === '') return null
  const frac = /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/.exec(s)
  if (frac) {
    const d = Number(frac[2])
    return d === 0 ? null : Number(frac[1]) / d
  }
  return /^-?\d+(?:\.\d+)?(?:e-?\d+)?$/i.test(s) ? Number(s) : null
}

export function checkNumeric(q: NumericQuestion, input: string): boolean {
  const n = parseNumber(input)
  return n !== null && Math.abs(n - q.answer) <= (q.tolerance ?? 1e-6)
}
