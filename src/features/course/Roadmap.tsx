import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bar } from '../../components/Charts'
import { courseSlug, hasLesson, localId } from '../../content'
import {
  badgesByModule,
  layoutRoadmap,
  milestoneBadges,
  NODE_H,
  NODE_W,
  readiness,
  type MilestoneBadge,
} from '../../core/layout'
import { lessonState } from '../../core/prereq'
import type { Course, LessonMeta, LessonProgress } from '../../core/types'
import { setLessonStars } from '../../hooks'

const MODULE_COLORS = ['#3b82f6', '#a855f7', '#f97316', '#14b8a6', '#f43f5e', '#eab308']

/** Badge colors by label: I, II = midterms, E = exam. */
const BADGE_COLORS: Record<string, string> = { I: '#3b82f6', II: '#a855f7', III: '#14b8a6', E: '#f43f5e' }
const badgeColor = (label: string) => BADGE_COLORS[label] ?? '#64748b'
const badgeStyle = (label: string) => ({
  background: `color-mix(in srgb, ${badgeColor(label)} 22%, transparent)`,
  color: badgeColor(label),
})

const tint = (color: string | undefined, pct: number) => `color-mix(in srgb, ${color} ${pct}%, var(--surface))`

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

export function Roadmap({
  course,
  progress,
}: {
  course: Course
  progress: ReadonlyMap<string, LessonProgress>
}) {
  const navigate = useNavigate()
  const layout = layoutRoadmap(course.modules)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const colorOf = new Map(course.modules.map((m, i) => [m.id, MODULE_COLORS[i % MODULE_COLORS.length]]))
  const titles = new Map(course.modules.flatMap((m) => m.lessons).map((l) => [l.id, l.title]))
  const pos = new Map(layout.nodes.map((n) => [n.lesson.id, n]))
  const selected = layout.nodes.find((n) => n.lesson.id === selectedId)?.lesson
  const badges = milestoneBadges(course.milestones)
  const badgeMap = badgesByModule(course.milestones, badges)

  return (
    <div className="space-y-3">
      <div
        className="overflow-x-auto rounded-2xl border border-line bg-surface p-5 shadow-sm"
        style={{ backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      >
        <div className="relative" style={{ width: layout.width, height: layout.height }}>
          <svg className="absolute inset-0" width={layout.width} height={layout.height} aria-hidden>
            <defs>
              <marker id="rm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="context-stroke" />
              </marker>
            </defs>
            {layout.edges.map((e) => {
              const a = pos.get(e.from)!
              const b = pos.get(e.to)!
              const x1 = a.x + NODE_W
              const y1 = a.y + NODE_H / 2
              const x2 = b.x - 2
              const y2 = b.y + NODE_H / 2
              const mid = (x1 + x2) / 2
              const active = selectedId === e.from || selectedId === e.to
              return (
                <path
                  key={`${e.from}>${e.to}`}
                  d={`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`}
                  fill="none"
                  stroke={active ? 'var(--fg)' : 'var(--line-strong)'}
                  strokeWidth={active ? 2 : 1.25}
                  strokeLinecap="round"
                  opacity={active || !selectedId ? 1 : 0.35}
                  markerEnd="url(#rm-arrow)"
                />
              )
            })}
          </svg>
          {layout.nodes.map((n) => {
            const st = lessonState(n.lesson, progress)
            const s = progress.get(n.lesson.id)?.stars ?? 0
            const corner = badgeMap.get(n.moduleId) ?? []
            return (
              <button
                key={n.lesson.id}
                onClick={() => setSelectedId(n.lesson.id)}
                onDoubleClick={() => navigate(`/c/${courseSlug(course)}/l/${localId(n.lesson.id)}`)}
                title={
                  st.status === 'locked'
                    ? `Needs: ${st.missing.map((m) => titles.get(m) ?? m).join(', ')} (double-click to open anyway)`
                    : 'Double-click to open'
                }
                className={[
                  'absolute flex flex-col justify-between rounded-xl border px-3 py-2 text-left text-xs leading-tight shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-lg',
                  st.status === 'done' ? 'border-ok' : '',
                  st.status === 'available' ? 'border-line-strong' : '',
                  st.status === 'locked' ? 'border-dashed border-line-strong text-muted' : '',
                  selectedId === n.lesson.id ? 'outline outline-2 outline-offset-1 outline-accent' : '',
                ].join(' ')}
                style={{
                  left: n.x,
                  top: n.y,
                  width: NODE_W,
                  height: NODE_H,
                  borderLeft: `5px solid ${colorOf.get(n.moduleId)}`,
                  background: tint(colorOf.get(n.moduleId), st.status === 'locked' ? 4 : st.status === 'done' ? 20 : 11),
                }}
              >
                {corner.length > 0 && (
                  <span className="absolute right-1.5 top-1 flex gap-0.5">
                    {corner.map((b) => (
                      <span
                        key={b.milestoneId}
                        title={b.title}
                        className="rounded-full px-1.5 text-[10px] font-bold leading-4 tracking-wide"
                        style={badgeStyle(b.label)}
                      >
                        {b.label}
                      </span>
                    ))}
                  </span>
                )}
                <span className="line-clamp-2 pr-8 text-[12.5px] font-medium">{n.lesson.title}</span>
                <span className="flex items-center justify-between">
                  <span className="text-star">{stars(s)}</span>
                  {st.status === 'done' && <span className="font-semibold text-ok">✓</span>}
                  {st.status === 'locked' && <span className="text-faint">needs {st.missing.length}</span>}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <Legend course={course} colorOf={colorOf} badges={badges} />
      {selected && <LessonPanel course={course} lesson={selected} progress={progress} titles={titles} />}
      <Readiness course={course} progress={progress} />
    </div>
  )
}

function LessonPanel({
  course,
  lesson,
  progress,
  titles,
}: {
  course: Course
  lesson: LessonMeta
  progress: ReadonlyMap<string, LessonProgress>
  titles: ReadonlyMap<string, string>
}) {
  const st = lessonState(lesson, progress)
  const current = progress.get(lesson.id)?.stars ?? 0
  return (
    <section className="rounded-xl border border-line bg-surface p-4 text-sm">
      <h3 className="font-semibold">{lesson.title}</h3>
      <Link className="mt-1 inline-block underline" to={`/c/${courseSlug(course)}/l/${localId(lesson.id)}`}>
        {hasLesson(course, localId(lesson.id)) ? 'Open lesson →' : 'Open lesson (content not written yet) →'}
      </Link>
      {st.status === 'locked' && (
        <p className="mt-1 text-warn">Do first: {st.missing.map((m) => titles.get(m) ?? m).join(', ')}</p>
      )}
      <div className="mt-2 flex items-center gap-2">
        <span>Mastery:</span>
        {([0, 1, 2, 3] as const).map((n) => (
          <button
            key={n}
            onClick={() => setLessonStars(lesson.id, n)}
            aria-pressed={current === n}
            className={`rounded border px-2 py-0.5 ${current === n ? 'border-accent bg-accent text-white' : 'border-line'}`}
          >
            {n === 0 ? 'not yet' : stars(n)}
          </button>
        ))}
      </div>
    </section>
  )
}

function Readiness({ course, progress }: { course: Course; progress: ReadonlyMap<string, LessonProgress> }) {
  const items = course.milestones.filter((m) => m.coversModules)
  return (
    <section className="rounded-xl border border-line bg-surface p-4">
      <h3 className="mb-2 text-sm font-semibold text-muted">Readiness</h3>
      <div className="space-y-2.5">
        {items.map((m) => {
          const r = readiness(m, course.modules, progress)
          return (
            <div key={m.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="truncate pr-2">{m.title}</span>
                <span className="tabular-nums text-muted">{r === null ? '–' : `${Math.round(r * 100)} %`}</span>
              </div>
              <Bar value={r} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Legend({
  course,
  colorOf,
  badges,
}: {
  course: Course
  colorOf: ReadonlyMap<string, string>
  badges: readonly MilestoneBadge[]
}) {
  const state = (cls: string, label: string) => (
    <span className="flex items-center gap-2">
      <span className={`inline-block h-4 w-6 rounded-md border ${cls}`} />
      {label}
    </span>
  )
  const group = (title: string, children: ReactNode) => (
    <div className="space-y-1.5">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-faint">{title}</h4>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
  return (
    <section className="grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-surface p-4 text-xs text-muted sm:grid-cols-2 lg:grid-cols-4">
      {group(
        'Status',
        <>
          {state('border-ok bg-ok-bg', 'Done (at least 1 star, stronger tint)')}
          {state('border-line-strong bg-surface', 'Available (tinted by module)')}
          {state('border-dashed border-line-strong bg-bg', 'Earlier lessons missing')}
        </>,
      )}
      {group(
        'Module (left stripe)',
        course.modules.map((m) => (
          <span key={m.id} className="flex items-center gap-2">
            <span className="inline-block h-4 w-1.5 rounded-sm" style={{ background: colorOf.get(m.id) }} />
            {m.title}
          </span>
        )),
      )}
      {badges.length > 0 &&
        group(
          'Needed for (top right)',
          badges.map((b) => (
            <span key={b.milestoneId} className="flex items-center gap-2">
              <span className="w-7 rounded-full px-1.5 text-center text-[10px] font-bold leading-4" style={badgeStyle(b.label)}>
                {b.label}
              </span>
              {b.title}
            </span>
          )),
        )}
      {group(
        'Controls',
        <>
          <span>Click a cell for details</span>
          <span>Double-click to open the lesson</span>
        </>,
      )}
    </section>
  )
}
