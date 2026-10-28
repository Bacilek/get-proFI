import { checkFill, checkNumeric, fillParts, parseNumber, type FillQuestion, type NumericQuestion } from './questions'

test('checkFill ignores whitespace and case, accepts alternatives, flags missing blanks', () => {
  const q = { id: 'q', type: 'fill', prompt: '', solution: '', code: 'public ___ void F() { ___ }', blanks: [['virtual', 'abstract'], ['return;']] } as FillQuestion
  expect(fillParts(q.code)).toHaveLength(3)
  expect(checkFill(q, [' Virtual ', 'return ;'])).toEqual([true, true])
  expect(checkFill(q, ['abstract'])).toEqual([true, false])
  expect(checkFill(q, ['override', 'x'])).toEqual([false, false])
})

test('parseNumber handles comma, spaces, fractions and junk', () => {
  expect(parseNumber('1,05')).toBe(1.05)
  expect(parseNumber(' -3 ')).toBe(-3)
  expect(parseNumber('1/4')).toBe(0.25)
  expect(parseNumber('2/0')).toBeNull()
  expect(parseNumber('abc')).toBeNull()
  expect(parseNumber('')).toBeNull()
})

test('checkNumeric respects tolerance', () => {
  const q = { id: 'q', type: 'numeric', prompt: '', solution: '', answer: 1.05, tolerance: 0.005 } as NumericQuestion
  expect(checkNumeric(q, '1,052')).toBe(true)
  expect(checkNumeric(q, '1.1')).toBe(false)
  expect(checkNumeric(q, 'x')).toBe(false)
})
