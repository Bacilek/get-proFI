import { courseStats } from './stats'
import type { LessonProgress, Module } from './types'

const l = (id: string) => ({ id, title: id, prerequisites: [], topics: [] })
const modules: Module[] = [
  { id: 'm1', title: 'M1', lessons: [l('a'), l('b')] },
  { id: 'm2', title: 'M2', lessons: [l('c')] },
]
const p = (lessonId: string, stars: LessonProgress['stars']): [string, LessonProgress] => [lessonId, { lessonId, stars, updatedAt: 0 }]

test('aggregates done lessons, average stars and star share', () => {
  const s = courseStats(modules, new Map([p('a', 3), p('b', 1)]))
  expect(s.total).toBe(3)
  expect(s.done).toBe(2)
  expect(s.starShare).toBeCloseTo(4 / 9)
  expect(s.modules[0]).toMatchObject({ done: 2, total: 2, avgStars: 2 })
  expect(s.modules[1]).toMatchObject({ done: 0, avgStars: null })
})
