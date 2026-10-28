import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'

const FILE = resolve(process.cwd(), 'userdata/backup.json')

type Next = () => void

/** `GET/PUT /api/backup` keeps the user's progress in `userdata/backup.json` (dev and preview server only). */
function handler(req: IncomingMessage, res: ServerResponse, next: Next) {
  if (!req.url?.startsWith('/api/backup')) return next()
  if (req.method === 'GET') {
    try {
      const body = readFileSync(FILE)
      res.setHeader('Content-Type', 'application/json')
      res.end(body)
    } catch {
      res.statusCode = 404
      res.end()
    }
    return
  }
  if (req.method === 'PUT') {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8')
        JSON.parse(text)
        mkdirSync(dirname(FILE), { recursive: true })
        writeFileSync(`${FILE}.tmp`, text)
        renameSync(`${FILE}.tmp`, FILE)
        res.statusCode = 204
      } catch {
        res.statusCode = 400
      }
      res.end()
    })
    return
  }
  res.statusCode = 405
  res.end()
}

export const userdata = (): Plugin => ({
  name: 'userdata-file',
  configureServer: (s) => void s.middlewares.use(handler),
  configurePreviewServer: (s) => void s.middlewares.use(handler),
})
