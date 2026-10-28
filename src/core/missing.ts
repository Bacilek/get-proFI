import type { Course } from './types'

export interface MissingInfo {
  id: string
  text: string
}

/**
 * Things the user still has to tell us for a course: explicit `openItems`
 * plus every milestone without a date ("TBD").
 */
export function missingInfo(course: Pick<Course, 'milestones' | 'openItems'>): MissingInfo[] {
  const tbd = course.milestones
    .filter((m) => !m.date)
    .map((m) => ({ id: `date:${m.id}`, text: `Date of "${m.title}" is not known yet` }))
  return [...(course.openItems ?? []), ...tbd]
}
