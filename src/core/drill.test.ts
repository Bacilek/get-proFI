import { checkNumeric } from './questions'
import { generate, generators, rng } from './drill'

test('rng is deterministic', () => {
  expect(rng(1)()).toBe(rng(1)())
  expect(rng(1)()).not.toBe(rng(2)())
})

test('every generator yields a finite answer that its own checker accepts', () => {
  for (const g of generators) {
    for (let seed = 1; seed <= 50; seed++) {
      const q = generate(g.topic, seed)!
      expect(Number.isFinite(q.answer)).toBe(true)
      expect(checkNumeric(q, String(q.answer))).toBe(true)
      expect(q.prompt).not.toMatch(/NaN|undefined/)
      expect(q.solution).not.toMatch(/NaN|undefined/)
    }
  }
})

test('generate returns null for topics without a generator', () => {
  expect(generate('mb142:limits', 1)).toBeNull()
})
