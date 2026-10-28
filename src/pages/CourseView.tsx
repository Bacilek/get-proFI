import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourse } from '../content'
import { semesterWeek } from '../core/milestones'
import { ExamStatus } from '../features/course/ExamStatus'
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
          {course.code} <span className="font-normal text-slate-600">{course.title}</span>
        </h1>
        <p className="text-sm text-slate-500">{course.semester} · week {week}</p>
      </header>
      <MissingInfoBox course={course} />
      <section>
        <h2 className="mb-1 font-semibold">Milestones</h2>
        <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white px-3">
          {course.milestones.map((m) => (
            <MilestoneRow key={m.id} milestone={m} result={results.get(m.id)} now={now} />
          ))}
        </ul>
        <div className="mt-2">
          <ExamStatus course={course} results={results} />
        </div>
      </section>
      <section>
        <h2 className="mb-1 font-semibold">Roadmap</h2>
        <Roadmap course={course} progress={progress} week={week} />
      </section>
    </div>
  )
}
