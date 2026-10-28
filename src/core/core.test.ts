import { bonusGranted, daysUntil, examPointsNeeded, semesterWeek, upcoming } from './milestones'
import { lessonState, studyOrder } from './prereq'
import { starsFromScore, topicMastery, weakestTopics } from './progress'
import { DAY_MS, isDue, newReview, review } from './srs'
import type { Attempt, LessonMeta, LessonProgress, Milestone, TopicRating } from './types'

const lesson = (id: string, prerequisites: string[] = []): LessonMeta => ({
  id,
  title: id,
  prerequisites,
  topics: [],
})
const prog = (lessonId: string, stars: LessonProgress['stars']): [string, LessonProgress] => [
  lessonId,
  { lessonId, stars, updatedAt: 0 },
]

describe('prerequisites', () => {
  const progress = new Map([prog('a:1', 2), prog('a:2', 0)])

  test('lesson without prerequisites is available', () => {
    expect(lessonState(lesson('a:3'), progress)).toEqual({ status: 'available', missing: [] })
  })

  test('done once it has a star', () => {
    expect(lessonState(lesson('a:1'), progress).status).toBe('done')
  })

  test('locked lists missing prerequisites, including cross-course and unknown ones', () => {
    const l = lesson('b:1', ['a:1', 'a:2', 'c:9'])
    expect(lessonState(l, progress)).toEqual({ status: 'locked', missing: ['a:2', 'c:9'] })
  })

  test('studyOrder puts prerequisites first', () => {
    const order = studyOrder([lesson('x', ['y']), lesson('y', ['z']), lesson('z')]).map((l) => l.id)
    expect(order).toEqual(['z', 'y', 'x'])
  })

  test('studyOrder throws on cycles', () => {
    expect(() => studyOrder([lesson('x', ['y']), lesson('y', ['x'])])).toThrow(/cycle/i)
  })
})

describe('stars and mastery', () => {
  test('starsFromScore thresholds', () => {
    expect(starsFromScore(0, 0)).toBe(0)
    expect(starsFromScore(4, 10)).toBe(0)
    expect(starsFromScore(5, 10)).toBe(1)
    expect(starsFromScore(7, 10)).toBe(2)
    expect(starsFromScore(9, 10)).toBe(3)
  })

  const att = (topic: string, correct: boolean, at: number): Attempt => ({
    questionId: 'q',
    topic,
    lessonId: 'l',
    correct,
    at,
  })
  const rating = (r: TopicRating['rating']): TopicRating => ({ topic: 't', rating: r, at: 0 })

  test('no data gives null', () => {
    expect(topicMastery('t', [], undefined)).toBeNull()
  })

  test('self rating only', () => {
    expect(topicMastery('t', [], rating(1))).toBe(0)
    expect(topicMastery('t', [], rating(5))).toBe(1)
  })

  test('attempts only, other topics ignored', () => {
    const attempts = [att('t', true, 1), att('t', false, 2), att('other', false, 3)]
    expect(topicMastery('t', attempts, undefined)).toBe(0.5)
  })

  test('blend of accuracy and rating', () => {
    expect(topicMastery('t', [att('t', true, 1)], rating(1))).toBeCloseTo(0.6)
  })

  test('only the 10 most recent attempts count', () => {
    const old = Array.from({ length: 10 }, (_, i) => att('t', false, i))
    const fresh = Array.from({ length: 10 }, (_, i) => att('t', true, 100 + i))
    expect(topicMastery('t', [...old, ...fresh], undefined)).toBe(1)
  })

  test('weakestTopics puts unknown first, then ascending mastery', () => {
    const ratings = new Map([['b', { topic: 'b', rating: 5 as const, at: 0 }]])
    const attempts = [att('a', false, 1)]
    const res = weakestTopics(['b', 'a', 'c'], attempts, ratings).map((r) => r.topic)
    expect(res).toEqual(['c', 'a', 'b'])
  })
})

describe('spaced repetition', () => {
  const now = 1_000_000
  test('good progression 1 -> 3 -> multiplied', () => {
    let s = newReview('q', now)
    expect(isDue(s, now)).toBe(true)
    s = review(s, 'good', now)
    expect(s.interval).toBe(1)
    s = review(s, 'good', now)
    expect(s.interval).toBe(3)
    s = review(s, 'good', now)
    expect(s.interval).toBe(Math.round(3 * 2.5))
    expect(s.due).toBe(now + s.interval * DAY_MS)
    expect(isDue(s, now)).toBe(false)
  })

  test('again resets repetitions and lowers ease (floor 1.3)', () => {
    let s = review(review(newReview('q', now), 'good', now), 'good', now)
    s = review(s, 'again', now)
    expect(s.reps).toBe(0)
    expect(s.interval).toBe(1)
    expect(s.ease).toBeCloseTo(2.3)
    for (let i = 0; i < 10; i++) s = review(s, 'again', now)
    expect(s.ease).toBe(1.3)
  })
})

describe('milestones', () => {
  const m = (id: string, date?: string): Milestone => ({ id, title: id, type: 'midterm', date })
  const now = new Date(2026, 9, 28, 15, 30) // 28 Oct 2026, afternoon

  test('daysUntil ignores time of day and handles TBD', () => {
    expect(daysUntil(m('a', '2026-10-28'), now)).toBe(0)
    expect(daysUntil(m('a', '2026-11-04'), now)).toBe(7)
    expect(daysUntil(m('a', '2026-10-20'), now)).toBe(-8)
    expect(daysUntil(m('a'), now)).toBeNull()
  })

  test('semesterWeek: 16 Sep 2026 starts week 1, 28 Oct is week 7', () => {
    expect(semesterWeek({ semesterStart: '2026-09-16' }, now)).toBe(7)
    expect(semesterWeek({ semesterStart: '2026-09-16' }, new Date(2026, 8, 16))).toBe(1)
  })

  test('examPointsNeeded uses reduced requirement only with bonus', () => {
    const rule = { maxPoints: 40, requiredPoints: 20, requiredWithBonus: 15 }
    expect(examPointsNeeded(rule, false)).toBe(20)
    expect(examPointsNeeded(rule, true)).toBe(15)
    expect(examPointsNeeded({ maxPoints: 40, requiredPoints: 20 }, true)).toBe(20)
  })

  test('bonusGranted depends on the source milestone result', () => {
    const rule = { maxPoints: 40, requiredPoints: 20, bonusFrom: { milestoneId: 'm1', minPoints: 8 } }
    const res = (p: number) => new Map([['m1', { milestoneId: 'm1', points: p, at: 0 }]])
    expect(bonusGranted(rule, res(8.25))).toBe(true)
    expect(bonusGranted(rule, res(7.5))).toBe(false)
    expect(bonusGranted(rule, new Map())).toBe(false)
    expect(bonusGranted({ maxPoints: 40, requiredPoints: 20 }, res(12))).toBe(false)
  })

  test('upcoming: skips past and resulted, sorted, TBD last', () => {
    const list = [m('late', '2026-12-10'), m('tbd'), m('past', '2026-10-20'), m('soon', '2026-11-05'), m('done', '2026-11-01')]
    const results = new Map([['done', { milestoneId: 'done', points: 1, at: 0 }]])
    expect(upcoming(list, results, now).map((x) => x.id)).toEqual(['soon', 'late', 'tbd'])
  })
})
