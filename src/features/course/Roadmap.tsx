import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  week,
}: {
  course: Course
  progress: ReadonlyMap<string, LessonProgress>
  week: number
}) {
  const layout = layoutRoadmap(course.modules)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const colorOf = new Map(course.modules.map((m, i) => [m.id, MODULE_COLORS[i % MODULE_COLORS.length]]))
  const titles = new Map(course.modules.flatMap((m) => m.lessons).map((l) => [l.id, l.title]))
  const pos = new Map(layout.nodes.map((n) => [n.lesson.id, n]))
  const selected = layout.nodes.find((n) => n.lesson.id === selectedId)?.lesson

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-md border border-line bg-surface p-4">
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
                title={st.status === 'locked' ? `Needs: ${st.missing.map((m) => titles.get(m) ?? m).join(', ')}` : undefined}
                className={[
                  'absolute rounded-md border px-2 py-1 text-left text-xs leading-tight',
                  st.status === 'done' ? 'border-ok bg-ok-bg' : '',
                  st.status === 'available' ? 'border-line-strong bg-surface' : '',
                  st.status === 'locked' ? 'border-dashed border-line bg-bg text-faint' : '',
                  n.lesson.week === week ? 'ring-2 ring-star' : '',
                  selectedId === n.lesson.id ? 'outline outline-2 outline-accent' : '',
                ].join(' ')}
                style={{
                  left: n.x,
                  top: n.y,
                  width: NODE_W,
                  height: NODE_H,
                  borderLeft: `4px solid ${colorOf.get(n.moduleId)}`,
                }}
              >
                <span className="line-clamp-2 font-medium">{n.lesson.title}</span>
                <span className="text-star">{stars(s)}</span>
                <span className="float-right text-faint">w{n.lesson.week}</span>
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-muted">Amber ring = taught this week. Dashed = prerequisites not done yet (you can still open it).</p>
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
    <section className="rounded-md border border-line bg-surface p-3 text-sm">
      <h3 className="font-semibold">{lesson.title}</h3>
      <p className="text-muted">Week {lesson.week}</p>
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
