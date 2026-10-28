import type { ChoiceQuestion } from './questions'
import { drawRound, scoreRound } from './ropot'
import { alphaBeta, countColorings, GENERATORS, makeRng, modelCount } from './ropotGen'

const q = (answer: number): ChoiceQuestion => ({ id: 'q', type: 'choice', prompt: '', solution: '', options: ['a', 'b', 'c', 'd'], answer })

test('scoring: +0.5 correct, -0.25 wrong, 0 blank', () => {
  expect(scoreRound([q(0), q(1), q(2), q(3)], [0, 1, 2, 3])).toBe(2)
  expect(scoreRound([q(0), q(1), q(2), q(3)], [0, 0, null, null])).toBe(0.25)
  expect(scoreRound([q(0)], [3])).toBe(-0.25)
})

test('every generator yields a valid 4-option question at both levels', () => {
  for (const g of GENERATORS) {
    for (const level of ['easy', 'hard'] as const) {
      for (let seed = 1; seed <= 150; seed++) {
        const x = g.make(makeRng(seed * 7919 + g.lecture), level)
        expect(x.type).toBe('choice')
        expect(x.options).toHaveLength(4)
        expect(new Set(x.options).size).toBe(4)
        expect(x.answer).toBeGreaterThanOrEqual(0)
        expect(x.answer).toBeLessThan(4)
        expect(x.solution.length).toBeGreaterThan(10)
      }
    }
  }
})

test('cycle and path colouring counts match brute force', () => {
  const brute = (shape: 'path' | 'cycle', n: number, k: number) => {
    let count = 0
    for (let m = 0; m < k ** n; m++) {
      const c = Array.from({ length: n }, (_, i) => Math.floor(m / k ** i) % k)
      const ok = c.every((v, i) => (i === 0 ? true : v !== c[i - 1])) && (shape === 'path' || c[0] !== c[n - 1])
      if (ok) count++
    }
    return count
  }
  for (const shape of ['path', 'cycle'] as const) {
    for (let n = 3; n <= 5; n++) for (let k = 2; k <= 4; k++) expect(countColorings(shape, n, k)).toBe(brute(shape, n, k))
  }
})

test('alpha-beta finds the minimax value and prunes', () => {
  expect(alphaBeta([[3, 12, 8], [2, 4, 6], [14, 5, 2]], true)).toEqual({ value: 3, leaves: 7 })
})

test('model count of p or not p is 8', () => {
  expect(modelCount({ k: 'b', op: '∨', a: { k: 'v', n: 'p' }, b: { k: 'n', a: { k: 'v', n: 'p' } } })).toBe(8)
})

test('drawRound honours lectures, level and size without repeats', () => {
  const authored = Array.from({ length: 6 }, (_, i) => ({
    question: { ...q(0), id: `a${i}`, difficulty: i < 5 ? ('easy' as const) : undefined },
    lecture: 1,
    lessonId: 'x:y',
  }))
  const round = drawRound(authored, [1], 'easy', makeRng(3))
  expect(round).toHaveLength(4)
  expect(round.every((r) => r.question.difficulty === 'easy')).toBe(true)
  expect(new Set(round.map((r) => r.question.id)).size).toBe(4)
  expect(drawRound([], [99], 'mixed', makeRng(1))).toEqual([])
})
