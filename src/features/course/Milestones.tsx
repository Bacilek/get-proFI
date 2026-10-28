import { daysUntil } from '../../core/milestones'
import type { Milestone, MilestoneResult } from '../../core/types'

/** `2026-10-20` -> `20. 10.` */
function shortDate(iso: string): string {
  const [, m, d] = iso.split('-')
  return `${Number(d)}. ${Number(m)}.`
}

function countdown(days: number): string {
  if (days === 0) return 'today'
  if (days === 1) return 'tomorrow'
  return days > 0 ? `in ${days} d` : `${-days} d ago`
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
  const days = daysUntil(milestone, now)
  const passed = result && milestone.minPoints !== undefined ? result.points >= milestone.minPoints : undefined
  const urgent = !result && days !== null && days >= 0 && days <= 7
  return (
    <li className="flex items-baseline justify-between gap-3 py-2">
      <span className="group relative min-w-0">
        <span className={milestone.info ? 'cursor-help border-b border-dotted border-faint' : ''}>
          {milestone.title}{' '}
          <span className="text-muted">({milestone.date ? shortDate(milestone.date) : 'TBD'})</span>
        </span>
        {milestone.info && (
          <span
            role="tooltip"
            className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-72 rounded-md border border-line bg-surface p-2.5 text-xs leading-relaxed text-muted shadow-xl group-hover:block"
          >
            {milestone.info}
          </span>
        )}
      </span>
      <span className="shrink-0 text-sm tabular-nums">
        {result ? (
          <span
            className={`rounded-full px-2 py-0.5 font-medium ${passed === false ? 'bg-warn-bg text-bad' : 'bg-ok-bg text-ok'}`}
          >
            {result.points}
            {milestone.maxPoints ? ` / ${milestone.maxPoints}` : ''} b
          </span>
        ) : days === null ? (
          <span className="rounded-full bg-warn-bg px-2 py-0.5 font-medium text-warn">date TBD</span>
        ) : (
          <span className={urgent ? 'font-medium text-warn' : 'text-muted'}>{countdown(days)}</span>
        )}
      </span>
    </li>
  )
}
