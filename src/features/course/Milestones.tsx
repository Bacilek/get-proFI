import { daysUntil } from '../../core/milestones'
import type { Milestone, MilestoneResult } from '../../core/types'

function when(m: Milestone, now: Date): string {
  const d = daysUntil(m, now)
  if (d === null) return 'date TBD'
  if (d === 0) return 'today'
  if (d > 0) return `in ${d} d (${m.date})`
  return `${m.date}`
}

export function MilestoneRow({
  milestone,
  result,
  now,
}: {
  milestone: Milestone
  result?: MilestoneResult
  now: Date
}) {
  const passed = result && milestone.minPoints !== undefined ? result.points >= milestone.minPoints : undefined
  return (
    <li className="flex items-baseline justify-between gap-3 py-1.5">
      <span>
        {milestone.boss && <span title="boss">⚔ </span>}
        {milestone.title}
      </span>
      <span className="shrink-0 text-sm tabular-nums text-slate-600">
        {result ? (
          <span className={passed === false ? 'text-red-600' : 'text-green-700'}>
            {result.points}
            {milestone.maxPoints ? ` / ${milestone.maxPoints}` : ''} b
          </span>
        ) : (
          <span className={milestone.date ? '' : 'font-medium text-amber-700'}>{when(milestone, now)}</span>
        )}
      </span>
    </li>
  )
}
