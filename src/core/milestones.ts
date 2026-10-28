import { DAY_MS } from './srs'
import type { Course, ExamRule, Milestone, MilestoneResult } from './types'

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

/** Whole days from `now` to the milestone date (negative = past); null when TBD. */
export function daysUntil(milestone: Milestone, now: Date): number | null {
  if (!milestone.date) return null
  const target = Date.parse(`${milestone.date}T00:00:00`)
  return Math.round((target - startOfDay(now)) / DAY_MS)
}

/** Current semester week (1-based) from the course start; may be < 1 or beyond the semester. */
export function semesterWeek(course: Pick<Course, 'semesterStart'>, now: Date): number {
  const start = Date.parse(`${course.semesterStart}T00:00:00`)
  return Math.floor((startOfDay(now) - start) / (7 * DAY_MS)) + 1
}

/** Points still required at the exam given the (optional) earned bonus. */
export function examPointsNeeded(rule: ExamRule, bonusGranted: boolean): number {
  return bonusGranted && rule.requiredWithBonus !== undefined
    ? rule.requiredWithBonus
    : rule.requiredPoints
}

/** Upcoming milestones (not yet resulted, date today or later), soonest first; TBD ones last. */
export function upcoming(
  milestones: readonly Milestone[],
  results: ReadonlyMap<string, MilestoneResult>,
  now: Date,
): Milestone[] {
  const open = milestones.filter((m) => !results.has(m.id))
  const dated = open
    .filter((m) => m.date && daysUntil(m, now)! >= 0)
    .sort((a, b) => a.date!.localeCompare(b.date!))
  return [...dated, ...open.filter((m) => !m.date)]
}
