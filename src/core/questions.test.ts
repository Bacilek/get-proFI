import { checkFill, checkMulti, checkNumeric, fillParts, parseExpression, parseNumber, type FillQuestion, type MultiQuestion, type NumericQuestion } from './questions'

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

test('parseExpression evaluates factorials, products and powers', () => {
  expect(parseExpression('8!')).toBe(40320)
  expect(parseExpression('8 * 7 * 6')).toBe(336)
  expect(parseExpression('2^9')).toBe(512)
  expect(parseExpression('(16*15*14*13)/24')).toBe(1820)
  expect(parseExpression('2^3!')).toBe(64)
  expect(parseExpression('1,5')).toBe(1.5)
  expect(parseExpression('8!!!')).toBeNull()
  expect(parseExpression('1/0')).toBeNull()
  expect(parseExpression('(2')).toBeNull()
  expect(parseExpression('alert(1)')).toBeNull()
})

test('checkNumeric accepts an expression for the answer', () => {
  const q = { id: 'q', type: 'numeric', prompt: '', solution: '', answer: 40320 } as NumericQuestion
  expect(checkNumeric(q, '8!')).toBe(true)
  expect(checkNumeric(q, '40 320')).toBe(true)
})

test('checkNumeric respects tolerance', () => {
  const q = { id: 'q', type: 'numeric', prompt: '', solution: '', answer: 1.05, tolerance: 0.005 } as NumericQuestion
  expect(checkNumeric(q, '1,052')).toBe(true)
  expect(checkNumeric(q, '1.1')).toBe(false)
  expect(checkNumeric(q, 'x')).toBe(false)
})

test('checkMulti needs exactly the correct set', () => {
  const q = { id: 'q', type: 'multi', prompt: '', solution: '', options: ['a', 'b', 'c'], answers: [0, 2] } as MultiQuestion
  expect(checkMulti(q, [2, 0])).toBe(true)
  expect(checkMulti(q, [0])).toBe(false)
  expect(checkMulti(q, [0, 1, 2])).toBe(false)
})
