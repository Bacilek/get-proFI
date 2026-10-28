import { semesterWeek } from './milestones'
import type { Course, MaterialKind } from './types'

export interface MissingInfo {
  id: string
  text: string
  /** Set for "material of week N is missing" items: the user can skip them. */
  skip?: { kind: MaterialKind; week: number; key: string }
}

const LABEL: Record<MaterialKind, string> = {
  lecture: 'Lecture',
  seminar: 'Seminar',
  ropot: 'ROPOT',
  syllabus: 'Syllabus',
}

export const skipKey = (course: Pick<Course, 'code'>, kind: MaterialKind, week: number) =>
  `${course.code.toLowerCase()}:${kind}:${week}`

/**
 * For each material kind the course uses: the earliest week (already started) whose material is
 * neither processed (`course.materials`) nor skipped. At most one item per kind.
 */
export function pendingMaterials(
  course: Pick<Course, 'code' | 'materials' | 'semesterStart'>,
  skipped: ReadonlySet<string>,
  now: Date,
): MissingInfo[] {
  const current = semesterWeek(course, now)
  const out: MissingInfo[] = []
  for (const [kind, first] of Object.entries(course.materials ?? {}) as [MaterialKind, number][]) {
    let week = first
    while (week <= current && skipped.has(skipKey(course, kind, week))) week++
    if (week > current) continue
    const key = skipKey(course, kind, week)
    out.push({
      id: `material:${key}`,
      text: `${LABEL[kind]} ${String(week).padStart(2, '0')}`,
      skip: { kind, week, key },
    })
  }
  return out
}

/**
 * Things the user still has to tell us for a course: missing weekly materials, explicit
 * `openItems` plus every milestone without a date ("TBD").
 */
export function missingInfo(
  course: Pick<Course, 'code' | 'milestones' | 'openItems' | 'materials' | 'semesterStart'>,
  skipped: ReadonlySet<string> = new Set(),
  now: Date = new Date(),
): MissingInfo[] {
  const tbd = course.milestones
    .filter((m) => !m.date)
    .map((m) => ({ id: `date:${m.id}`, text: `Date of "${m.title}" is not known yet` }))
  return [...pendingMaterials(course, skipped, now), ...(course.openItems ?? []), ...tbd]
}
