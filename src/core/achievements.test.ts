import { achievements, type AchievementInput } from './achievements'
import type { Course, LessonProgress } from './types'

const course: Course = {
  code: 'AB1',
  title: 'T',
  semester: 's',
  semesterStart: '2026-09-16',
  modules: [
    {
      id: 'm',
      title: 'M',
      lessons: [
        { id: 'ab1:a', title: 'a', prerequisites: [], topics: [] },
        { id: 'ab1:b', title: 'b', prerequisites: [], topics: [] },
      ],
    },
  ],
  milestones: [{ id: 'mid', title: 'Mid', type: 'midterm', boss: true, minPoints: 8 }],
}

const base = (over: Partial<AchievementInput> = {}): AchievementInput => ({
  courses: [course],
  progress: new Map(),
  attempts: [],
  ratings: new Map(),
  results: [],
  ...over,
})
const unlocked = (i: AchievementInput) => achievements(i).filter((a) => a.unlocked).map((a) => a.id)
const p = (lessonId: string, stars: LessonProgress['stars']): [string, LessonProgress] => [lessonId, { lessonId, stars, updatedAt: 0 }]

test('nothing unlocked without progress', () => {
  expect(unlocked(base())).toEqual([])
})

test('lesson, module, course and three-star achievements', () => {
  expect(unlocked(base({ progress: new Map([p('ab1:a', 1)]) }))).toEqual(['first-lesson'])
  const all = unlocked(base({ progress: new Map([p('ab1:a', 3), p('ab1:b', 1)]) }))
  expect(all).toEqual(expect.arrayContaining(['first-lesson', 'three-stars', 'module', 'course']))
})

test('boss needs the milestone minimum', () => {
  const r = (points: number) => [{ milestoneId: 'ab1:mid', points, at: 0 }]
  expect(unlocked(base({ results: r(7) }))).not.toContain('boss')
  expect(unlocked(base({ results: r(8) }))).toContain('boss')
})

test('progress is capped at the target', () => {
  const attempts = Array.from({ length: 80 }, () => ({ questionId: 'q', topic: 't', lessonId: 'l', correct: true, at: 0 }))
  const a = achievements(base({ attempts })).find((x) => x.id === 'answers-50')
  expect(a).toMatchObject({ unlocked: true, progress: { current: 50, target: 50 } })
})
