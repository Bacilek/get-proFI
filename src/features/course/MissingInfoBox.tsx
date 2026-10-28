import { missingInfo } from '../../core/missing'
import type { Course } from '../../core/types'

export function MissingInfoBox({ course }: { course: Course }) {
  const items = missingInfo(course)
  if (items.length === 0) return null
  return (
    <div role="alert" className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
      <p className="font-medium">! Missing info – tell Claude when you know it</p>
      <ul className="mt-1 list-disc pl-5">
        {items.map((i) => (
          <li key={i.id}>{i.text}</li>
        ))}
      </ul>
    </div>
  )
}
