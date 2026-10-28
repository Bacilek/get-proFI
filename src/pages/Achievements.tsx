import { useLiveQuery } from 'dexie-react-hooks'
import { Bar } from '../components/Charts'
import { courses } from '../content'
import { achievements } from '../core/achievements'
import { db } from '../core/db'
import { useAttempts, useLessonProgress, useRatings } from '../hooks'

export default function Achievements() {
  const progress = useLessonProgress()
  const attempts = useAttempts()
  const ratings = useRatings()
  const results = useLiveQuery(() => db.results.toArray(), []) ?? []
  const list = achievements({ courses, progress, attempts, ratings, results })
  const unlocked = list.filter((a) => a.unlocked).length
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Achievements</h1>
      <p className="text-sm text-muted">
        {unlocked}/{list.length} unlocked
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {list.map((a) => (
          <li
            key={a.id}
            className={`rounded-xl border border-line bg-surface p-4 shadow-sm ${a.unlocked ? '' : 'opacity-60'}`}
          >
            <h2 className="font-semibold">
              {a.unlocked ? '★ ' : ''}
              {a.title}
            </h2>
            <p className="text-sm text-muted">{a.description}</p>
            {!a.unlocked && (
              <div className="mt-2">
                <Bar value={a.progress.current / a.progress.target} tone="accent" />
                <p className="mt-1 text-xs tabular-nums text-muted">
                  {a.progress.current}/{a.progress.target}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
