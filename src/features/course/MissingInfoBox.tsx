import { missingInfo } from '../../core/missing'
import type { Course } from '../../core/types'
import { skipMaterial, useSkips } from '../../hooks'

export function MissingInfoBox({ course, now }: { course: Course; now: Date }) {
  const skips = useSkips()
  const items = missingInfo(course, skips, now)
  if (items.length === 0) return null
  const materials = items.filter((i) => i.skip)
  const rest = items.filter((i) => !i.skip)
  return (
    <div role="alert" className="space-y-3 rounded-xl border border-warn bg-warn-bg p-4 text-sm text-warn">
      <p className="font-medium">! Missing info, tell Claude when you know it</p>
      {materials.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs opacity-80">
            Oldest week without processed material (upload it, or skip if this subject has none that week):
          </p>
          <ul className="flex flex-wrap gap-2">
            {materials.map((i) => (
              <li key={i.id} className="flex items-center gap-2 rounded-lg border border-warn/40 bg-surface py-1 pl-3 pr-1 text-fg">
                <span className="font-medium">{i.text}</span>
                <button
                  onClick={() => skipMaterial(i.skip!.key)}
                  className="rounded-md border border-line px-2 py-0.5 text-xs text-muted hover:text-fg"
                >
                  Skip
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {rest.length > 0 && (
        <ul className="list-disc space-y-0.5 pl-5">
          {rest.map((i) => (
            <li key={i.id}>{i.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
