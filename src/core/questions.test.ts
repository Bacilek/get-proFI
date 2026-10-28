import { checkNumeric, parseNumber, type NumericQuestion } from './questions'

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
