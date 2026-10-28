import { bonusGranted, examPointsNeeded } from '../../core/milestones'
import type { Course, MilestoneResult } from '../../core/types'

export function ExamStatus({ course, results }: { course: Course; results: ReadonlyMap<string, MilestoneResult> }) {
  const rule = course.exam
  if (!rule) return null
  const bonus = bonusGranted(rule, results)
  const needed = examPointsNeeded(rule, bonus)
  return (
    <p className="text-sm">
      Exam: need <strong>{needed}</strong> / {rule.maxPoints} points
      {bonus && rule.bonusPoints ? (
        <span className="text-ok"> (bonus +{rule.bonusPoints} b earned, requirement lowered from {rule.requiredPoints})</span>
      ) : null}
    </p>
  )
}
