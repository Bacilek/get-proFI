import type { Question } from './core/questions'
import type { Course } from './core/types'

const files = import.meta.glob<Course>('../content/*/course.json', { eager: true, import: 'default' })

export const courses: Course[] = Object.values(files).sort((a, b) => a.code.localeCompare(b.code))

export const courseSlug = (c: Pick<Course, 'code'>) => c.code.toLowerCase()

export const getCourse = (slug: string | undefined) => courses.find((c) => courseSlug(c) === slug?.toLowerCase())

/** Milestone result ids are namespaced by course (see seedInitialResults). */
export const resultId = (c: Pick<Course, 'code'>, milestoneId: string) => `${courseSlug(c)}:${milestoneId}`

const lessonFiles = import.meta.glob<string>('../content/*/lessons/*.md', { query: '?raw', import: 'default' })
const questionFiles = import.meta.glob<Question[]>('../content/*/questions/*.json', { import: 'default' })

/** `mb142:limits` -> `limits` */
export const localId = (globalId: string) => globalId.slice(globalId.indexOf(':') + 1)

const lessonPath = (c: Pick<Course, 'code'>, id: string) => `../content/${courseSlug(c)}/lessons/${id}.md`
const questionPath = (c: Pick<Course, 'code'>, id: string) => `../content/${courseSlug(c)}/questions/${id}.json`

export const hasLesson = (c: Pick<Course, 'code'>, id: string) => lessonPath(c, id) in lessonFiles

export async function loadLesson(c: Pick<Course, 'code'>, id: string): Promise<string | null> {
  return (await lessonFiles[lessonPath(c, id)]?.()) ?? null
}

export async function loadQuestions(c: Pick<Course, 'code'>, id: string): Promise<Question[]> {
  return (await questionFiles[questionPath(c, id)]?.()) ?? []
}
