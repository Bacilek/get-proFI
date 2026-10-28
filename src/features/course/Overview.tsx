import { Bar, Ring } from '../../components/Charts'
import { weakestTopics } from '../../core/progress'
import { courseStats } from '../../core/stats'
import type { Course, LessonProgress } from '../../core/types'
import { useAttempts, useRatings } from '../../hooks'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  )
}

export function Overview({ course, progress }: { course: Course; progress: ReadonlyMap<string, LessonProgress> }) {
  const stats = courseStats(course.modules, progress)
  const attempts = useAttempts()
  const ratings = useRatings()
  const titles = new Map(course.modules.flatMap((m) => m.lessons).map((l) => [l.topics[0] ?? l.id, l.title]))
  const mine = new Set(titles.keys())
  const touched = weakestTopics([...mine], attempts, ratings)
    .filter((t) => t.mastery !== null)
    .slice(0, 5)

  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr]">
      <section className="flex items-center gap-6 rounded-xl border border-line bg-surface p-4">
        <Ring value={stats.total ? stats.done / stats.total : 0} label={`${stats.done}/${stats.total}`} sub="lessons" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <Stat label="stars earned" value={`${Math.round(stats.starShare * 100)} %`} />
          <Stat label="practice answers" value={String(attempts.length)} />
        </div>
      </section>

      <section className="rounded-xl border border-line bg-surface p-4">
        <h3 className="mb-2 text-sm font-semibold text-muted">Readiness by module</h3>
        <div className="space-y-2.5">
          {stats.modules.map((m) => (
            <div key={m.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="truncate pr-2">{m.title}</span>
                <span className="shrink-0 tabular-nums text-muted">
                  {m.done}/{m.total}
                  {m.avgStars !== null && <span className="text-star"> · ★ {m.avgStars.toFixed(1)}</span>}
                </span>
              </div>
              <Bar value={m.total ? m.done / m.total : 0} />
            </div>
          ))}
        </div>
      </section>

      {touched.length > 0 && (
        <section className="rounded-xl border border-line bg-surface p-4 md:col-span-2">
          <h3 className="mb-2 text-sm font-semibold text-muted">Weakest topics (from practice + self-rating)</h3>
          <div className="space-y-2">
            {touched.map((t) => (
              <div key={t.topic} className="grid grid-cols-[1fr_8rem_3rem] items-center gap-3 text-sm">
                <span className="truncate">{titles.get(t.topic) ?? t.topic}</span>
                <Bar value={t.mastery} />
                <span className="text-right tabular-nums text-muted">{Math.round((t.mastery ?? 0) * 100)} %</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
