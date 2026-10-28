import 'fake-indexeddb/auto'
import { ProfiDB } from './db'
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
