import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourse } from '../content'
import { semesterWeek } from '../core/milestones'
import { ExamStatus } from '../features/course/ExamStatus'
import { MilestoneRow } from '../features/course/Milestones'
import { MissingInfoBox } from '../features/course/MissingInfoBox'
import { useCourseResults } from '../hooks'

export default function CourseView() {
  const { slug } = useParams()
  const course = getCourse(slug)
  if (!course) return <p>Unknown course. <Link to="/" className="underline">Back</Link></p>
  return <CourseBody course={course} />
}

function CourseBody({ course }: { course: NonNullable<ReturnType<typeof getCourse>> }) {
  const [now] = useState(() => new Date())
  const results = useCourseResults(course)
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
      {course.modules.map((mod) => (
        <section key={mod.id}>
          <h2 className="mb-1 font-semibold">{mod.title}</h2>
          <ul className="space-y-0.5 text-sm">
            {mod.lessons.map((l) => (
              <li key={l.id} className={l.week === week ? 'font-medium' : ''}>
                <span className="mr-2 inline-block w-10 text-slate-400">w{l.week}</span>
                {l.title}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
