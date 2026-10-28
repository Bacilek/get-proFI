import type { ProfiDB } from './db'
import { seedParts } from './parts'
import type { Course } from './types'

/** Adds known results from course content once; never overwrites what the user has stored. */
export async function seedInitialResults(db: ProfiDB, courses: readonly Course[], now = Date.now()): Promise<void> {
  for (const course of courses) {
    for (const p of course.initialParts ?? []) {
      await seedParts(db, `${course.code.toLowerCase()}:${p.milestoneId}`, p.values, now)
    }
    for (const r of course.initialResults ?? []) {
      const id = `${course.code.toLowerCase()}:${r.milestoneId}`
      if (!(await db.results.get(id))) await db.results.put({ milestoneId: id, points: r.points, at: now })
    }
  }
}
