import { missingInfo } from './missing'

test('combines explicit open items with milestones without a date', () => {
  const res = missingInfo({
    openItems: [{ id: 'bonus', text: 'Confirm how the exam bonus works' }],
    milestones: [
      { id: 'm1', title: 'Midterm 1', type: 'midterm', date: '2026-10-20' },
      { id: 'm2', title: 'Midterm 2', type: 'midterm' },
    ],
  })
  expect(res.map((r) => r.id)).toEqual(['bonus', 'date:m2'])
})

test('nothing missing gives an empty list', () => {
  expect(missingInfo({ milestones: [] })).toEqual([])
})
