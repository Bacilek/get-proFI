import { missingInfo, partKey, pendingMaterials, pendingParts, skipKey } from './missing'

const base = { code: 'XX1', semesterStart: '2026-09-14' }
const week7 = new Date(2026, 9, 28)

test('combines explicit open items with milestones without a date', () => {
  const res = missingInfo(
    {
      ...base,
      openItems: [{ id: 'bonus', text: 'Confirm how the exam bonus works' }],
      milestones: [
        { id: 'm1', title: 'Midterm 1', type: 'midterm', date: '2026-10-20' },
        { id: 'm2', title: 'Midterm 2', type: 'midterm' },
      ],
    },
    new Set(),
    week7,
  )
  expect(res.map((r) => r.id)).toEqual(['bonus', 'date:m2'])
})

test('nothing missing gives an empty list', () => {
  expect(missingInfo({ ...base, milestones: [] }, new Set(), week7)).toEqual([])
})

test('materials: earliest unprocessed week per kind, only for weeks that already started', () => {
  const course = { ...base, materials: { lecture: 7, syllabus: 6, ropot: 8 } }
  const res = pendingMaterials(course, new Set(), week7)
  expect(res.map((r) => r.text)).toEqual(['Lecture 07', 'Syllabus 06'])
})

test('skipping a week moves to the next one, skipping all current weeks hides the kind', () => {
  const course = { ...base, materials: { syllabus: 6 } }
  const skipped = new Set([skipKey(course, 'syllabus', 6)])
  expect(pendingMaterials(course, skipped, week7).map((r) => r.text)).toEqual(['Syllabus 07'])
  skipped.add(skipKey(course, 'syllabus', 7))
  expect(pendingMaterials(course, skipped, week7)).toEqual([])
})

test('a kind without an entry (deleted folder) is never requested', () => {
  expect(pendingMaterials({ ...base, materials: {} }, new Set(), week7)).toEqual([])
})

test('parts: past deadline without entered points is reminded, entered or future ones are not', () => {
  const course = {
    ...base,
    milestones: [{ id: 'hw', title: 'HW', type: 'assignment' as const, date: '2026-12-01', parts: { count: 3, max: 3, label: 'Homework', deadlines: ['2026-10-06', '2026-10-20', '2026-11-03'] } }],
  }
  expect(pendingParts(course, new Set(), week7).map((r) => r.id)).toEqual(['part:hw:1', 'part:hw:2'])
  expect(pendingParts(course, new Set([partKey(base, 'hw', 1)]), week7).map((r) => r.id)).toEqual(['part:hw:2'])
})
