import type { ProfiDB } from './db'

export const BACKUP_VERSION = 1

export interface Backup {
  app: 'get-profi'
  version: number
  exportedAt: string
  lessons: unknown[]
  attempts: unknown[]
  ratings: unknown[]
  reviews: unknown[]
  results: unknown[]
  skips?: unknown[]
  parts?: unknown[]
}

export async function exportBackup(db: ProfiDB, now = new Date()): Promise<Backup> {
  const [lessons, attempts, ratings, reviews, results, skips, parts] = await Promise.all([
    db.lessons.toArray(),
    db.attempts.toArray(),
    db.ratings.toArray(),
    db.reviews.toArray(),
    db.results.toArray(),
    db.skips.toArray(),
    db.parts.toArray(),
  ])
  return {
    app: 'get-profi',
    version: BACKUP_VERSION,
    exportedAt: now.toISOString(),
    lessons,
    attempts,
    ratings,
    reviews,
    results,
    skips,
    parts,
  }
}

function isBackup(x: unknown): x is Backup {
  if (typeof x !== 'object' || x === null) return false
  const b = x as Record<string, unknown>
  return (
    b.app === 'get-profi' &&
    typeof b.version === 'number' &&
    ['lessons', 'attempts', 'ratings', 'reviews', 'results'].every((k) => Array.isArray(b[k]))
  )
}

/** Replaces ALL progress in the database with the backup contents (atomic). */
export async function importBackup(db: ProfiDB, data: unknown): Promise<void> {
  if (!isBackup(data)) throw new Error('Not a get-proFI backup file')
  if (data.version > BACKUP_VERSION) throw new Error(`Backup version ${data.version} is newer than supported`)
  await db.transaction('rw', [db.lessons, db.attempts, db.ratings, db.reviews, db.results, db.skips, db.parts], async () => {
    await Promise.all([db.lessons.clear(), db.attempts.clear(), db.ratings.clear(), db.reviews.clear(), db.results.clear(), db.skips.clear(), db.parts.clear()])
    await db.lessons.bulkAdd(data.lessons as never[])
    await db.attempts.bulkAdd(data.attempts as never[])
    await db.ratings.bulkAdd(data.ratings as never[])
    await db.reviews.bulkAdd(data.reviews as never[])
    await db.results.bulkAdd(data.results as never[])
    await db.skips.bulkAdd((Array.isArray(data.skips) ? data.skips : []) as never[])
    await db.parts.bulkAdd((Array.isArray(data.parts) ? data.parts : []) as never[])
  })
}
