import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { courseSlug, getCourse } from '../content'
import { semesterWeek } from '../core/milestones'
import { ExamStatus } from '../features/course/ExamStatus'
import { Overview } from '../features/course/Overview'
import { MilestoneRow } from '../features/course/Milestones'
import { MissingInfoBox } from '../features/course/MissingInfoBox'
import { Roadmap } from '../features/course/Roadmap'
import { useCourseResults, useLessonProgress } from '../hooks'

export default function CourseView() {
  const { slug } = useParams()
  const course = getCourse(slug)
  if (!course) return <p>Unknown course. <Link to="/" className="underline">Back</Link></p>
  return <CourseBody course={course} />
}

function CourseBody({ course }: { course: NonNullable<ReturnType<typeof getCourse>> }) {
  const [now] = useState(() => new Date())
  const results = useCourseResults(course)
  const progress = useLessonProgress()
  const week = semesterWeek(course, now)
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold">
          {course.code} <span className="font-normal text-muted">{course.title}</span>
        </h1>
        <p className="text-sm text-muted">{course.semester} · week {week}</p>
        {course.materials?.ropot !== undefined && (
          <Link to={`/c/${courseSlug(course)}/ropot`} className="mt-2 inline-block rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
            ROPOT trainer →
          </Link>
        )}
      </header>
      <MissingInfoBox course={course} now={now} />
      <Overview course={course} progress={progress} />
      <section>
        <h2 className="mb-1 font-semibold">Milestones</h2>
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface px-4">
          {course.milestones.map((m) => (
            <MilestoneRow key={m.id} course={course} milestone={m} result={results.get(m.id)} now={now} />
          ))}
        </ul>
        <div className="mt-2">
          <ExamStatus course={course} results={results} />
        </div>
      </section>
      <section>
        <h2 className="mb-1 font-semibold">Roadmap</h2>
        <Roadmap course={course} progress={progress} />
      </section>
    </div>
  )
}
