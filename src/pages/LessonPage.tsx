import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Markdown } from '../components/Markdown'
import { courseSlug, getCourse, loadLesson, loadQuestions, localId } from '../content'
import { lessonState } from '../core/prereq'
import type { Question } from '../core/questions'
import { Practice } from '../features/lesson/Practice'
import { setTopicRating, useLessonProgress, useTopicRating } from '../hooks'

export default function LessonPage() {
  const { slug, lessonId } = useParams()
  const course = getCourse(slug)
  const lesson = course?.modules.flatMap((m) => m.lessons).find((l) => localId(l.id) === lessonId)
  if (!course || !lesson) return <p>Unknown lesson. <Link to="/" className="underline">Back</Link></p>
  return <LessonBody key={lesson.id} course={course} lesson={lesson} />
}

type Loaded = { md: string | null; questions: Question[] } | null

function LessonBody({
  course,
  lesson,
}: {
  course: NonNullable<ReturnType<typeof getCourse>>
  lesson: NonNullable<NonNullable<ReturnType<typeof getCourse>>['modules'][number]['lessons'][number]>
}) {
  const [loaded, setLoaded] = useState<Loaded>(null)
  const progress = useLessonProgress()
  const topic = lesson.topics[0] ?? lesson.id
  const rating = useTopicRating(topic)
  const state = lessonState(lesson, progress)
  const stars = progress.get(lesson.id)?.stars ?? 0

  useEffect(() => {
    let cancelled = false
    const id = localId(lesson.id)
    Promise.all([loadLesson(course, id), loadQuestions(course, id)]).then(([md, questions]) => {
      if (!cancelled) setLoaded({ md, questions })
    })
    return () => {
      cancelled = true
    }
  }, [course, lesson.id])

  return (
    <article className="space-y-4">
      <Link to={`/c/${courseSlug(course)}`} className="text-sm text-muted hover:underline">← {course.code} roadmap</Link>
      <header>
        <h1 className="text-2xl font-semibold">{lesson.title}</h1>
        <p className="text-sm text-muted">
          Week {lesson.week} · <span className="text-star">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>
        </p>
        {state.status === 'locked' && (
          <p className="mt-1 text-sm text-warn">
            Prerequisites not done yet: {state.missing.join(', ')}
          </p>
        )}
      </header>

      {loaded === null && <p className="text-muted">Loading…</p>}
      {loaded && loaded.md === null && <p className="rounded border border-dashed border-line p-3 text-muted">Content for this lesson is not written yet.</p>}
      {loaded?.md && <Markdown>{loaded.md}</Markdown>}

      <section className="flex flex-wrap items-center gap-2 text-sm">
        <span>How well do you know this topic?</span>
        {([1, 2, 3, 4, 5] as const).map((n) => (
          <button
            key={n}
            onClick={() => setTopicRating(topic, n)}
            aria-pressed={rating?.rating === n}
            className={`h-7 w-7 rounded border ${rating?.rating === n ? 'border-accent bg-accent text-white' : 'border-line'}`}
          >
            {n}
          </button>
        ))}
      </section>

      {loaded && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">Practice</h2>
          <Practice course={course} lessonId={lesson.id} topic={topic} questions={loaded.questions} />
        </section>
      )}
    </article>
  )
}
