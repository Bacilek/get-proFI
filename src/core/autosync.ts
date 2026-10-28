import { exportBackup, importBackup } from './backup'
import type { ProfiDB } from './db'

const DIRTY_KEY = 'get-profi-unsaved'
const URL = '/api/backup'

const flag = {
  get: () => {
    try {
      return localStorage.getItem(DIRTY_KEY) === '1'
    } catch {
      return false
    }
  },
  set: (v: boolean) => {
    try {
      if (v) localStorage.setItem(DIRTY_KEY, '1')
      else localStorage.removeItem(DIRTY_KEY)
    } catch {
      /* storage blocked: sync still works, just without the crash safety flag */
    }
  },
}

/**
 * Mirrors the database into `userdata/backup.json` through the local server. On start the file wins
 * (it is the source of truth) unless the browser holds changes that could not be written earlier.
 * Does nothing when the server API is not there (e.g. static hosting).
 */
export async function startAutosync(db: ProfiDB): Promise<void> {
  let applying = false
  let timer: ReturnType<typeof setTimeout> | undefined

  const push = async () => {
    try {
      const res = await fetch(URL, { method: 'PUT', body: JSON.stringify(await exportBackup(db), null, 1) })
      if (res.ok) flag.set(false)
    } catch {
      /* server not running: stay dirty, retry on the next change or start */
    }
  }

  let available = false
  try {
    const res = await fetch(URL)
    available = res.ok || res.status === 404
    if (res.ok && !flag.get()) {
      applying = true
      try {
        await importBackup(db, await res.json())
      } finally {
        applying = false
      }
    }
  } catch {
    return
  }
  if (!available) return
  if (flag.get() || (await db.attempts.count()) + (await db.lessons.count()) + (await db.results.count()) > 0) await push()

  for (const table of db.tables) {
    const mark = () => {
      if (applying) return
      flag.set(true)
      clearTimeout(timer)
      timer = setTimeout(() => void push(), 800)
    }
    table.hook('creating', () => void mark())
    table.hook('updating', () => void mark())
    table.hook('deleting', () => void mark())
  }
}
