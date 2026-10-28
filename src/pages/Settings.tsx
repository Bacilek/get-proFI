import { useState } from 'react'
import { exportBackup, importBackup } from '../core/backup'
import { db } from '../core/db'

export default function Settings() {
  const [msg, setMsg] = useState('')

  async function onExport() {
    const data = await exportBackup(db)
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `get-profi-backup-${data.exportedAt.slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Backup downloaded.')
  }

  async function onImport(file: File | undefined) {
    if (!file) return
    if (!confirm('Importing replaces ALL current progress. Continue?')) return
    try {
      await importBackup(db, JSON.parse(await file.text()))
      setMsg('Backup imported.')
    } catch (e) {
      setMsg(`Import failed: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-sm text-slate-600">
        Progress lives only in this browser. Export a backup regularly.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded bg-slate-800 px-3 py-1.5 text-white" onClick={onExport}>
          Export backup
        </button>
        <label className="cursor-pointer rounded border border-slate-300 px-3 py-1.5">
          Import backup
          <input type="file" accept="application/json" className="hidden" onChange={(e) => onImport(e.target.files?.[0])} />
        </label>
      </div>
      {msg && <p role="status" className="text-sm">{msg}</p>}
    </div>
  )
}
