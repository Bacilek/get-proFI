import type { GlobalId } from './types'

interface QuestionBase {
  /** Unique within the course; stored as `<course>:<id>` in attempts/reviews. */
  id: string
  /** Topic override; defaults to the lesson's first topic. */
  topic?: GlobalId
  /** Markdown with KaTeX. */
  prompt: string
  /** Markdown with KaTeX, shown after answering (or on giving up): worked steps, not just the result. */
  solution: string
  /** Optional progressive hints, vaguest first; the user reveals them one by one before answering. */
  hints?: string[]
  /** Used by the ROPOT trainer to offer easier or harder rounds; untagged = in between. */
  difficulty?: 'easy' | 'hard'
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

/** Several options are correct; the user ticks all of them (exact set match, no partial credit). */
export interface MultiQuestion extends QuestionBase {
  type: 'multi'
  options: string[]
  /** Indices into `options` of all correct options. */
  answers: number[]
}

/** Self-graded: the user compares with `solution` and says whether they had it. */
export interface FreeQuestion extends QuestionBase {
  type: 'free'
}

/** Code with blanks (`___`); each blank accepts any of its listed answers (whitespace-insensitive). */
export interface FillQuestion extends QuestionBase {
  type: 'fill'
  code: string
  /** One list of accepted answers per `___` in `code`, in order. */
  blanks: string[][]
}

/** The user writes code on the side, reveals `solution` (reference code) and ticks the checklist items their code satisfies. */
export interface CodeQuestion extends QuestionBase {
  type: 'code'
  /** Optional skeleton prefilled into the editor. */
  starter?: string
  /** Properties a correct solution must have (edge cases, idioms, complexity). */
  checklist: string[]
}

export type Question = NumericQuestion | ChoiceQuestion | MultiQuestion | FreeQuestion | FillQuestion | CodeQuestion

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

const normCode = (s: string) => s.replace(/\s+/g, '').toLowerCase()

/** Splits fill-in code into text parts around its `___` blanks (n blanks -> n + 1 parts). */
export const fillParts = (code: string) => code.split('___')

/** Per-blank correctness; a missing input counts as wrong. */
export function checkFill(q: FillQuestion, inputs: string[]): boolean[] {
  return q.blanks.map((accepted, i) => accepted.some((a) => normCode(a) === normCode(inputs[i] ?? '')))
}

export function checkNumeric(q: NumericQuestion, input: string): boolean {
  const n = parseNumber(input)
  return n !== null && Math.abs(n - q.answer) <= (q.tolerance ?? 1e-6)
}

/** True when exactly the correct options are ticked. */
export function checkMulti(q: MultiQuestion, picked: readonly number[]): boolean {
  const want = new Set(q.answers)
  return picked.length === want.size && picked.every((i) => want.has(i))
}
