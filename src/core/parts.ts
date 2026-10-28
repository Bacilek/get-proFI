import type { ProfiDB } from './db'

export const partId = (resultKey: string, n: number) => `${resultKey}:${n}`

/** Sets (or, with `null`, clears) part `n` and rewrites the milestone total as the sum of its parts. */
export async function setPart(db: ProfiDB, resultKey: string, n: number, points: number | null, now = Date.now()): Promise<void> {
  await db.transaction('rw', [db.parts, db.results], async () => {
    if (points === null) await db.parts.delete(partId(resultKey, n))
    else await db.parts.put({ id: partId(resultKey, n), points })
    await syncTotal(db, resultKey, now)
  })
}

async function syncTotal(db: ProfiDB, resultKey: string, now: number): Promise<void> {
  const rows = await db.parts.where('id').startsWith(`${resultKey}:`).toArray()
  if (rows.length === 0) await db.results.delete(resultKey)
  else await db.results.put({ milestoneId: resultKey, points: rows.reduce((s, r) => s + r.points, 0), at: now })
}

/** Seeds known parts of a milestone once (only when it has none stored yet). */
export async function seedParts(db: ProfiDB, resultKey: string, values: readonly number[], now = Date.now()): Promise<void> {
  await db.transaction('rw', [db.parts, db.results], async () => {
    if ((await db.parts.where('id').startsWith(`${resultKey}:`).count()) > 0) return
    await db.parts.bulkPut(values.map((points, i) => ({ id: partId(resultKey, i + 1), points })))
    await syncTotal(db, resultKey, now)
  })
}
