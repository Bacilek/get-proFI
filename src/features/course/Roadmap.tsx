import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bar } from '../../components/Charts'
import { courseSlug, hasLesson, localId } from '../../content'
import { layoutRoadmap, NODE_H, NODE_W, readiness } from '../../core/layout'
import { lessonState } from '../../core/prereq'
import type { Course, LessonMeta, LessonProgress } from '../../core/types'
import { setLessonStars } from '../../hooks'

const MODULE_COLORS = ['#2563eb', '#9333ea', '#ea580c', '#0d9488', '#be123c']

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

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4">
        <div className="relative" style={{ width: layout.width, height: layout.height }}>
          <svg className="absolute inset-0" width={layout.width} height={layout.height} aria-hidden>
            {layout.edges.map((e) => {
              const a = pos.get(e.from)!
              const b = pos.get(e.to)!
              const x1 = a.x + NODE_W
              const y1 = a.y + NODE_H / 2
              const x2 = b.x
              const y2 = b.y + NODE_H / 2
              const mid = (x1 + x2) / 2
              const active = selectedId === e.from || selectedId === e.to
              return (
                <path
                  key={`${e.from}>${e.to}`}
                  d={`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`}
                  fill="none"
                  stroke={active ? 'var(--fg)' : 'var(--line-strong)'}
                  strokeWidth={active ? 2 : 1}
                />
              )
            })}
          </svg>
          {layout.nodes.map((n) => {
            const st = lessonState(n.lesson, progress)
            const s = progress.get(n.lesson.id)?.stars ?? 0
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
                  'absolute flex flex-col justify-between rounded-lg border px-2.5 py-1.5 text-left text-xs leading-tight shadow-sm transition hover:-translate-y-px hover:shadow-md',
                  st.status === 'done' ? 'border-ok bg-ok-bg' : '',
                  st.status === 'available' ? 'border-line-strong bg-surface' : '',
                  st.status === 'locked' ? 'border-dashed border-line-strong bg-bg text-muted' : '',
                  selectedId === n.lesson.id ? 'outline outline-2 outline-offset-1 outline-accent' : '',
                ].join(' ')}
                style={{
                  left: n.x,
                  top: n.y,
                  width: NODE_W,
                  height: NODE_H,
                  borderLeft: `5px solid ${colorOf.get(n.moduleId)}`,
                }}
              >
                <span className="line-clamp-2 text-[12.5px] font-medium">{n.lesson.title}</span>
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
      <Legend course={course} colorOf={colorOf} />
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

function Legend({ course, colorOf }: { course: Course; colorOf: ReadonlyMap<string, string> }) {
  const state = (cls: string, label: string) => (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-3.5 w-5 rounded border ${cls}`} />
      {label}
    </span>
  )
  return (
    <div className="space-y-2 rounded-xl border border-line bg-surface p-3 text-xs text-muted">
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        {state('border-ok bg-ok-bg', 'done (at least 1 star)')}
        {state('border-line-strong bg-surface', 'available')}
        {state('border-dashed border-line-strong bg-bg', 'earlier lessons not done yet (you can still open it)')}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <span>Left stripe = module:</span>
        {course.modules.map((m) => (
          <span key={m.id} className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-1.5 rounded-sm" style={{ background: colorOf.get(m.id) }} />
            {m.title}
          </span>
        ))}
      </div>
      <p>Click a cell for details, double-click to open the lesson.</p>
    </div>
  )
}
