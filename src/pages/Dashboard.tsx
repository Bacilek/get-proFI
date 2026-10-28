import { useState } from 'react'
import { Link } from 'react-router-dom'
import { courseSlug, courses } from '../content'
import { semesterWeek, upcoming } from '../core/milestones'
import { missingInfo } from '../core/missing'
import type { Course } from '../core/types'
import { ExamStatus } from '../features/course/ExamStatus'
import { MilestoneRow } from '../features/course/Milestones'
import { useCourseResults } from '../hooks'

function CourseCard({ course, now }: { course: Course; now: Date }) {
  const results = useCourseResults(course)
  const next = upcoming(course.milestones, results, now).slice(0, 3)
  const missing = missingInfo(course).length
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">
          <Link to={`/c/${courseSlug(course)}`} className="hover:underline">
            {course.code} <span className="font-normal text-slate-600">{course.title}</span>
          </Link>
        </h2>
        {missing > 0 && (
          <span title="Missing info" className="rounded-full bg-amber-100 px-2 text-sm font-bold text-amber-800">
            ! {missing}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500">
        {course.semester} · week {semesterWeek(course, now)}
      </p>
      <ul className="mt-2 divide-y divide-slate-100">
        {next.map((m) => (
          <MilestoneRow key={m.id} milestone={m} now={now} />
        ))}
      </ul>
      <div className="mt-2">
        <ExamStatus course={course} results={results} />
      </div>
    </section>
  )
}

export default function Dashboard() {
  const [now] = useState(() => new Date())
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((c) => (
          <CourseCard key={c.code} course={c} now={now} />
        ))}
      </div>
    </div>
  )
}
