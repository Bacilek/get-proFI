import 'fake-indexeddb/auto'
import { ProfiDB } from './db'
import { setPart } from './parts'
import { seedInitialResults } from './seed'
import type { Course } from './types'

const course = {
  code: 'MB142',
  initialResults: [{ milestoneId: 'midterm1', points: 8.25 }],
} as Course

test('seeds namespaced results once and keeps user edits', async () => {
  const db = new ProfiDB('seed-test')
  await seedInitialResults(db, [course], 1)
  expect(await db.results.get('mb142:midterm1')).toEqual({ milestoneId: 'mb142:midterm1', points: 8.25, at: 1 })
  await db.results.put({ milestoneId: 'mb142:midterm1', points: 10, at: 2 })
  await seedInitialResults(db, [course], 3)
  expect((await db.results.get('mb142:midterm1'))?.points).toBe(10)
})

test('seeds weekly parts once and derives the total', async () => {
  const db = new ProfiDB('seed-parts-test')
  const c = { code: 'PB016', initialParts: [{ milestoneId: 'minitests', values: [2, 1.25, 2] }] } as Course
  await seedInitialResults(db, [c], 1)
  expect((await db.results.get('pb016:minitests'))?.points).toBe(5.25)
  await setPart(db, 'pb016:minitests', 2, 2, 2)
  expect((await db.results.get('pb016:minitests'))?.points).toBe(6)
  await seedInitialResults(db, [c], 3)
  expect((await db.parts.get('pb016:minitests:2'))?.points).toBe(2)
  await setPart(db, 'pb016:minitests', 1, null)
  await setPart(db, 'pb016:minitests', 2, null)
  await setPart(db, 'pb016:minitests', 3, null)
  expect(await db.results.get('pb016:minitests')).toBeUndefined()
})
