import { isDone } from './prereq'
import type { Attempt, Course, LessonProgress, MilestoneResult, TopicRating } from './types'

export interface AchievementInput {
  courses: readonly Course[]
  progress: ReadonlyMap<string, LessonProgress>
  attempts: readonly Attempt[]
  ratings: ReadonlyMap<string, TopicRating>
  /** Milestone results keyed by global id (`<course>:<milestoneId>`). */
  results: readonly MilestoneResult[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  /** Progress towards the goal, e.g. 3/10. */
  progress: { current: number; target: number }
}

function countBased(id: string, title: string, description: string, current: number, target: number): Achievement {
  return { id, title, description, unlocked: current >= target, progress: { current: Math.min(current, target), target } }
}

/** Achievements are derived from stored progress, so they never go out of sync and need no table of their own. */
export function achievements(input: AchievementInput): Achievement[] {
  const { courses, progress, attempts, ratings, results } = input
  const lessons = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons))
  const done = lessons.filter((l) => isDone(progress.get(l.id))).length
  const threeStars = lessons.filter((l) => progress.get(l.id)?.stars === 3).length
  const correct = attempts.filter((a) => a.correct).length

  const completeModules = courses
    .flatMap((c) => c.modules)
    .filter((m) => m.lessons.length > 0 && m.lessons.every((l) => isDone(progress.get(l.id)))).length
  const completeCourses = courses.filter((c) => {
    const ls = c.modules.flatMap((m) => m.lessons)
    return ls.length > 0 && ls.every((l) => isDone(progress.get(l.id)))
  }).length

  const bossPassed = results.filter((r) => {
    const sep = r.milestoneId.indexOf(':')
    const code = r.milestoneId.slice(0, sep)
    const m = courses
      .find((c) => c.code.toLowerCase() === code)
      ?.milestones.find((x) => x.id === r.milestoneId.slice(sep + 1))
    return m?.boss === true && r.points >= (m.minPoints ?? 1)
  }).length

  return [
    countBased('first-lesson', 'First step', 'Finish your first lesson.', done, 1),
    countBased('ten-lessons', 'Getting going', 'Finish 10 lessons.', done, 10),
    countBased('three-stars', 'Perfectionist', 'Earn 3 stars in a lesson.', threeStars, 1),
    countBased('module', 'Module cleared', 'Finish every lesson of a module.', completeModules, 1),
    countBased('course', 'Course cleared', 'Finish every lesson of a course.', completeCourses, 1),
    countBased('answers-50', 'Practice makes perfect', 'Answer 50 questions correctly.', correct, 50),
    countBased('self-aware', 'Self-aware', 'Rate 5 topics yourself.', ratings.size, 5),
    countBased('boss', 'Boss defeated', 'Pass an exam or midterm.', bossPassed, 1),
  ]
}
