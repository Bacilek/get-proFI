import type { Course } from './core/types'

const files = import.meta.glob<Course>('../content/*/course.json', { eager: true, import: 'default' })

export const courses: Course[] = Object.values(files).sort((a, b) => a.code.localeCompare(b.code))

export const courseSlug = (c: Pick<Course, 'code'>) => c.code.toLowerCase()

export const getCourse = (slug: string | undefined) => courses.find((c) => courseSlug(c) === slug?.toLowerCase())

/** Milestone result ids are namespaced by course (see seedInitialResults). */
export const resultId = (c: Pick<Course, 'code'>, milestoneId: string) => `${courseSlug(c)}:${milestoneId}`
