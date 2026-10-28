import { useState } from 'react'
import { Bar } from '../../components/Charts'
import { daysUntil } from '../../core/milestones'
import { parseNumber } from '../../core/questions'
import type { Course, Milestone, MilestoneResult } from '../../core/types'
import { setMilestonePoints } from '../../hooks'

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

const fmt = (n: number) => String(Math.round(n * 100) / 100).replace('.', ',')

function InfoTip({ info }: { info: string | string[] }) {
  const items = Array.isArray(info) ? info : [info]
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-80 rounded-lg border border-line bg-surface p-3 text-xs leading-relaxed text-muted shadow-xl group-hover:block"
    >
      <ul className="list-disc space-y-1 pl-4">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </span>
  )
}

function PointsEditor({
  course,
  milestone,
  result,
  onDone,
}: {
  course: Course
  milestone: Milestone
  result?: MilestoneResult
  onDone: () => void
}) {
  const [text, setText] = useState(result ? fmt(result.points) : '')
  const value = parseNumber(text)
  const valid = value !== null && value >= 0 && (milestone.maxPoints === undefined || value <= milestone.maxPoints)
  async function save() {
    if (!valid) return
    await setMilestonePoints(course, milestone.id, value)
    onDone()
  }
  return (
    <span className="flex items-center gap-1.5 text-xs">
      <input
        autoFocus
        inputMode="decimal"
        aria-label={`Points for ${milestone.title}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? save() : e.key === 'Escape' ? onDone() : undefined)}
        className={`w-16 rounded border bg-bg px-1.5 py-0.5 text-right tabular-nums ${text && !valid ? 'border-bad' : 'border-line-strong'}`}
      />
      {milestone.maxPoints !== undefined && <span className="text-muted">/ {milestone.maxPoints} b</span>}
      <button onClick={save} disabled={!valid} className="rounded bg-accent px-2 py-0.5 text-white disabled:opacity-40">
        Save
      </button>
      {result && (
        <button
          onClick={async () => {
            await setMilestonePoints(course, milestone.id, null)
            onDone()
          }}
          className="rounded border border-line px-2 py-0.5 text-muted"
        >
          Clear
        </button>
      )}
      <button onClick={onDone} className="text-muted underline">
        Cancel
      </button>
    </span>
  )
}

export function MilestoneRow({
  course,
  milestone,
  result,
  now,
}: {
  course: Course
  milestone: Milestone
  result?: MilestoneResult
  now: Date
}) {
  const [editing, setEditing] = useState(false)
  const days = daysUntil(milestone, now)
  const { minPoints, maxPoints } = milestone
  const passed = result && minPoints !== undefined ? result.points >= minPoints : undefined
  const urgent = !result && days !== null && days >= 0 && days <= 7
  const when = milestone.date ? `${shortDate(milestone.date)}${milestone.time ? ` ${milestone.time}` : ''}` : 'TBD'
  const toMin = result && minPoints !== undefined ? Math.max(0, minPoints - result.points) : null

  return (
    <li className="py-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="group relative min-w-0">
          <span className={milestone.info ? 'cursor-help border-b border-dotted border-faint' : ''}>
            {milestone.title} <span className="text-muted">({when})</span>
          </span>
          {milestone.info && <InfoTip info={milestone.info} />}
        </span>
        <span className="flex shrink-0 items-center gap-2 text-sm tabular-nums">
          {editing ? (
            <PointsEditor course={course} milestone={milestone} result={result} onDone={() => setEditing(false)} />
          ) : (
            <>
              {result ? (
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${passed === false ? 'bg-warn-bg text-bad' : 'bg-ok-bg text-ok'}`}
                >
                  {fmt(result.points)}
                  {maxPoints ? ` / ${maxPoints}` : ''} b
                </span>
              ) : days === null ? (
                <span className="rounded-full bg-warn-bg px-2 py-0.5 font-medium text-warn">date TBD</span>
              ) : (
                <span className={urgent ? 'font-medium text-warn' : 'text-muted'}>{countdown(days)}</span>
              )}
              {maxPoints !== undefined && (
                <button
                  onClick={() => setEditing(true)}
                  className="rounded border border-line px-1.5 py-0.5 text-xs text-muted hover:text-fg"
                  title={result ? 'Edit points' : 'Enter points'}
                >
                  {result ? 'edit' : '+ points'}
                </button>
              )}
            </>
          )}
        </span>
      </div>
      {result && minPoints !== undefined && !editing && (
        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted">
          <div className="w-40">
            <Bar value={Math.min(1, result.points / minPoints)} />
          </div>
          <span>
            {toMin === 0 ? (
              <span className="text-ok">minimum {minPoints} b reached</span>
            ) : (
              <>
                minimum {minPoints} b, <strong className="text-fg">{fmt(toMin ?? 0)} b</strong> to go
              </>
            )}
          </span>
        </div>
      )}
    </li>
  )
}
