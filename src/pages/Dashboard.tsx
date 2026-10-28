import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from '../components/Charts'
import { courseSlug, courses } from '../content'
import { courseStats } from '../core/stats'
import { semesterWeek, upcoming } from '../core/milestones'
import { missingInfo } from '../core/missing'
import type { Course } from '../core/types'
import { ExamStatus } from '../features/course/ExamStatus'
import { MilestoneRow } from '../features/course/Milestones'
import { useCourseResults, useLessonProgress } from '../hooks'

function CourseCard({ course, now }: { course: Course; now: Date }) {
  const results = useCourseResults(course)
  const stats = courseStats(course.modules, useLessonProgress())
  const next = upcoming(course.milestones, results, now).slice(0, 3)
  const missing = missingInfo(course).length
  return (
    <section className="rounded-xl border border-line bg-surface p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">
          <Link to={`/c/${courseSlug(course)}`} className="hover:underline">
            {course.code} <span className="font-normal text-muted">{course.title}</span>
          </Link>
        </h2>
        {missing > 0 && (
          <span title="Missing info" className="rounded-full bg-warn-bg px-2 text-sm font-bold text-warn">
            ! {missing}
          </span>
        )}
      </div>
      <p className="text-sm text-muted">
        {course.semester} · week {semesterWeek(course, now)}
      </p>
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs text-muted">
          <span>Lessons</span>
          <span className="tabular-nums">{stats.done}/{stats.total}</span>
        </div>
        <Bar value={stats.total ? stats.done / stats.total : 0} tone="accent" />
      </div>
      <ul className="mt-2 divide-y divide-line">
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
