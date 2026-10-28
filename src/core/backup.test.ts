import 'fake-indexeddb/auto'
import { exportBackup, importBackup } from './backup'
import { ProfiDB } from './db'

let n = 0
const freshDb = () => new ProfiDB(`test-${n++}`)

test('export then import round-trips and replaces existing data', async () => {
  const a = freshDb()
  await a.lessons.put({ lessonId: 'mb142:limits', stars: 3, updatedAt: 1 })
  await a.attempts.add({ questionId: 'q1', topic: 'mb142:limits', lessonId: 'mb142:limits', correct: true, at: 2 })
  await a.ratings.put({ topic: 'mb142:limits', rating: 4, at: 3 })
  await a.results.put({ milestoneId: 'mb142:midterm1', points: 8.25, at: 4 })
  const backup = JSON.parse(JSON.stringify(await exportBackup(a, new Date(0))))

  const b = freshDb()
  await b.lessons.put({ lessonId: 'stale', stars: 1, updatedAt: 0 })
  await importBackup(b, backup)

  expect(await b.lessons.toArray()).toEqual([{ lessonId: 'mb142:limits', stars: 3, updatedAt: 1 }])
  expect((await b.attempts.toArray())[0]).toMatchObject({ questionId: 'q1', correct: true })
  expect(await b.ratings.get('mb142:limits')).toMatchObject({ rating: 4 })
  expect(await b.results.get('mb142:midterm1')).toMatchObject({ points: 8.25 })
})

test('import rejects foreign files and keeps data intact', async () => {
  const d = freshDb()
  await d.lessons.put({ lessonId: 'x', stars: 2, updatedAt: 0 })
  await expect(importBackup(d, { hello: 'world' })).rejects.toThrow(/backup/i)
  await expect(importBackup(d, { app: 'get-profi', version: 99, lessons: [], attempts: [], ratings: [], reviews: [], results: [] })).rejects.toThrow(/newer/i)
  expect(await d.lessons.count()).toBe(1)
})
