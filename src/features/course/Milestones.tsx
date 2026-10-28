import { useState } from 'react'
import { Bar } from '../../components/Charts'
import { daysUntil } from '../../core/milestones'
import { parseNumber } from '../../core/questions'
import type { Course, Milestone, MilestoneResult } from '../../core/types'
import { setMilestonePart, setMilestonePoints, useParts } from '../../hooks'

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

function PartsGrid({ course, milestone }: { course: Course; milestone: Milestone }) {
  const parts = useParts(course, milestone.id)
  const { count, max, label } = milestone.parts!
  return (
    <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg border border-line bg-bg p-3 sm:grid-cols-4 md:grid-cols-6">
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <PartInput key={n} course={course} milestone={milestone} n={n} label={`${label} ${n}`} max={max} value={parts.get(n)} />
      ))}
    </div>
  )
}

function PartInput({
  course,
  milestone,
  n,
  label,
  max,
  value,
}: {
  course: Course
  milestone: Milestone
  n: number
  label: string
  max: number
  value: number | undefined
}) {
  const [text, setText] = useState<string | null>(null)
  const shown = text ?? (value === undefined ? '' : fmt(value))
  const parsed = parseNumber(shown)
  const valid = shown.trim() === '' || (parsed !== null && parsed >= 0 && parsed <= max)
  async function commit() {
    if (text === null) return
    if (valid) await setMilestonePart(course, milestone.id, n, shown.trim() === '' ? null : parsed)
    setText(null)
  }
  return (
    <label className="flex flex-col gap-0.5 text-xs text-muted">
      {label}
      <span className="flex items-center gap-1">
        <input
          inputMode="decimal"
          value={shown}
          placeholder="–"
          onChange={(e) => setText(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => (e.key === 'Enter' ? e.currentTarget.blur() : e.key === 'Escape' ? setText(null) : undefined)}
          className={`w-14 rounded border bg-surface px-1.5 py-0.5 text-right tabular-nums text-fg ${valid ? 'border-line-strong' : 'border-bad'}`}
        />
        <span>/ {max}</span>
      </span>
    </label>
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
  const [showParts, setShowParts] = useState(false)
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
              {milestone.parts ? (
                <button
                  onClick={() => setShowParts((v) => !v)}
                  aria-expanded={showParts}
                  className="rounded border border-line px-1.5 py-0.5 text-xs text-muted hover:text-fg"
                  title="Points per exercise"
                >
                  {showParts ? 'hide' : 'by week'}
                </button>
              ) : maxPoints !== undefined && (
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
      {showParts && milestone.parts && <PartsGrid course={course} milestone={milestone} />}
    </li>
  )
}
