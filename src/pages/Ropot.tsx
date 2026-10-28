import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Markdown } from '../components/Markdown'
import { courseSlug, getCourse, loadQuestionIndex } from '../content'
import {
  availableLectures,
  drawRound,
  ROPOT_SECONDS,
  scoreRound,
  type AuthoredChoice,
  type RoundLevel,
  type RoundQuestion,
} from '../core/ropot'
import { makeRng } from '../core/ropotGen'
import type { ChoiceQuestion } from '../core/questions'
import type { Course } from '../core/types'
import { recordAnswer, recordAttempt } from '../hooks'

const LETTERS = ['a', 'b', 'c', 'd', 'e']
const LEVELS: { id: RoundLevel; label: string; hint: string }[] = [
  { id: 'easy', label: 'Easy', hint: 'warm-up, basic definitions and simple calculations' },
  { id: 'mixed', label: 'Mixed', hint: 'what the real ROPOT is like' },
  { id: 'hard', label: 'Hard', hint: 'traps, longer calculations' },
]

export default function Ropot() {
  const { slug } = useParams()
  const course = getCourse(slug)
  if (!course) return <p>Unknown course. <Link to="/" className="underline">Back</Link></p>
  return <RopotBody course={course} />
}

function useAuthored(course: Course): AuthoredChoice[] | null {
  const [items, setItems] = useState<AuthoredChoice[] | null>(null)
  useEffect(() => {
    let cancelled = false
    loadQuestionIndex().then((index) => {
      if (cancelled) return
      const week = new Map(course.modules.flatMap((m) => m.lessons).map((l) => [l.id, l.week ?? 0]))
      const slug = courseSlug(course)
      const out: AuthoredChoice[] = []
      for (const [key, { question, lessonId }] of index) {
        if (!key.startsWith(`${slug}:`) || question.type !== 'choice') continue
        out.push({ question, lessonId, lecture: week.get(lessonId) ?? 0 })
      }
      setItems(out)
    })
    return () => {
      cancelled = true
    }
  }, [course])
  return items
}

function RopotBody({ course }: { course: Course }) {
  const authored = useAuthored(course)
  const [lectures, setLectures] = useState<number[] | null>(null)
  const [level, setLevel] = useState<RoundLevel>('mixed')
  const [round, setRound] = useState<RoundQuestion[] | null>(null)
  const [roundNo, setRoundNo] = useState(0)

  const all = useMemo(() => (authored ? availableLectures(authored) : []), [authored])
  const chosen = lectures ?? all.filter((n) => n >= 1 && n <= 6)
  const titleOf = (n: number) =>
    course.modules.find((m) => m.lessons.some((l) => l.week === n))?.title.replace(/^[\d–]+\.\s*/, '') ?? ''

  function start() {
    if (!authored || chosen.length === 0) return
    const next = drawRound(authored, chosen, level, makeRng((Date.now() ^ (roundNo * 7919)) >>> 0))
    if (next.length > 0) {
      setRound(next)
      setRoundNo((n) => n + 1)
    }
  }

  if (round) {
    return <Quiz key={roundNo} course={course} round={round} onAgain={start} onExit={() => setRound(null)} />
  }
  return (
    <div className="space-y-5">
      <Link to={`/c/${courseSlug(course)}`} className="text-sm text-muted hover:underline">← {course.code}</Link>
      <header>
        <h1 className="text-2xl font-semibold">ROPOT trainer</h1>
        <p className="text-sm text-muted">
          Four questions, 6 minutes, +0,5 b for a correct answer, −0,25 b for a wrong one, blank = 0. The real ROPOT
          at exercise <em>k</em> tests lecture <em>k</em>−1.
        </p>
      </header>
      {authored === null ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <>
          <section className="rounded-xl border border-line bg-surface p-4">
            <h2 className="mb-2 text-sm font-semibold text-muted">Lectures to practise</h2>
            <div className="flex flex-wrap gap-2">
              {all.map((n) => {
                const on = chosen.includes(n)
                return (
                  <button
                    key={n}
                    aria-pressed={on}
                    onClick={() => setLectures(on ? chosen.filter((x) => x !== n) : [...chosen, n])}
                    className={`rounded-lg border px-3 py-1.5 text-left text-sm ${on ? 'border-accent bg-accent/10' : 'border-line text-muted'}`}
                  >
                    <span className="font-semibold">Lecture {n}</span>
                    <span className="block text-xs">{titleOf(n)}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-2 flex gap-3 text-xs">
              <button className="underline" onClick={() => setLectures(all)}>all</button>
              <button className="underline" onClick={() => setLectures([])}>none</button>
            </div>
          </section>
          <section className="rounded-xl border border-line bg-surface p-4">
            <h2 className="mb-2 text-sm font-semibold text-muted">Difficulty</h2>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  aria-pressed={level === l.id}
                  onClick={() => setLevel(l.id)}
                  className={`rounded-lg border px-3 py-1.5 text-left text-sm ${level === l.id ? 'border-accent bg-accent/10' : 'border-line text-muted'}`}
                >
                  <span className="font-semibold">{l.label}</span>
                  <span className="block text-xs">{l.hint}</span>
                </button>
              ))}
            </div>
          </section>
          <button
            onClick={start}
            disabled={chosen.length === 0}
            className="rounded-lg bg-accent px-5 py-2 font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            Start round
          </button>
        </>
      )}
    </div>
  )
}

function Quiz({
  course,
  round,
  onAgain,
  onExit,
}: {
  course: Course
  round: RoundQuestion[]
  onAgain: () => void
  onExit: () => void
}) {
  const questions: ChoiceQuestion[] = round.map((r) => r.question)
  const [answers, setAnswers] = useState<(number | null)[]>(() => round.map(() => null))
  const [left, setLeft] = useState(ROPOT_SECONDS)
  const [finished, setDone] = useState(false)
  const done = finished || left <= 0
  const recorded = useRef(false)

  useEffect(() => {
    if (done) return
    const t = setInterval(() => setLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [done])
  useEffect(() => {
    if (!done || recorded.current) return
    recorded.current = true
    const lessons = course.modules.flatMap((m) => m.lessons)
    round.forEach((r, i) => {
      const a = answers[i]
      if (a === null) return
      const lesson = r.lessonId ? lessons.find((l) => l.id === r.lessonId) : lessons.find((l) => l.week === r.lecture)
      if (!lesson) return
      const entry = {
        questionId: `${courseSlug(course)}:${r.question.id}`,
        topic: r.question.topic ?? lesson.topics[0] ?? lesson.id,
        lessonId: lesson.id,
        correct: a === r.question.answer,
      }
      // Generated questions are not in the index, so they must not enter spaced repetition.
      void (r.lessonId ? recordAnswer(entry) : recordAttempt(entry))
    })
  }, [done, answers, round, course])

  const score = scoreRound(questions, answers)
  const fmt = (n: number) => String(n).replace('.', ',')
  const mm = `${Math.floor(Math.max(0, left) / 60)}:${String(Math.max(0, left) % 60).padStart(2, '0')}`

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 -mx-2 flex items-center justify-between rounded-xl border border-line bg-surface/95 px-4 py-2 backdrop-blur">
        <strong>ROPOT trainer</strong>
        {done ? (
          <span className="text-lg font-semibold tabular-nums">{fmt(score)} / 2 b</span>
        ) : (
          <span className={`text-lg font-semibold tabular-nums ${left <= 60 ? 'text-bad' : ''}`}>{mm}</span>
        )}
      </div>

      {round.map((r, i) => {
        const q = r.question
        const picked = answers[i]
        return (
          <section key={q.id} className="rounded-xl border border-line bg-surface p-4">
            <p className="mb-1 text-xs text-muted">
              Question {i + 1} · lecture {r.lecture}
              {done && picked !== null && (
                <span className={`ml-2 font-semibold ${picked === q.answer ? 'text-ok' : 'text-bad'}`}>
                  {picked === q.answer ? '+0,5' : '−0,25'}
                </span>
              )}
              {done && picked === null && <span className="ml-2">unanswered, 0</span>}
            </p>
            <Markdown>{q.prompt}</Markdown>
            <ul className="mt-2 space-y-1.5">
              {q.options.map((o, k) => {
                const correct = done && k === q.answer
                const wrong = done && picked === k && k !== q.answer
                return (
                  <li key={o}>
                    <button
                      disabled={done}
                      aria-pressed={picked === k}
                      onClick={() => setAnswers((a) => a.map((v, j) => (j === i ? (v === k ? null : k) : v)))}
                      className={[
                        'flex w-full items-baseline gap-2 rounded-lg border px-3 py-2 text-left',
                        correct ? 'border-ok bg-ok-bg' : wrong ? 'border-bad bg-warn-bg' : picked === k ? 'border-accent bg-accent/10' : 'border-line hover:border-line-strong',
                      ].join(' ')}
                    >
                      <span className="font-semibold text-muted">{LETTERS[k]})</span>
                      <span className="min-w-0"><Markdown>{o}</Markdown></span>
                    </button>
                  </li>
                )
              })}
            </ul>
            {done && (
              <div className="mt-3 rounded-lg border border-line bg-bg p-3 text-sm">
                <p className="mb-1 font-semibold">Solution</p>
                <Markdown>{q.solution}</Markdown>
              </div>
            )}
          </section>
        )
      })}

      <div className="flex flex-wrap gap-3">
        {done ? (
          <>
            <button onClick={onAgain} className="rounded-lg bg-accent px-5 py-2 font-medium text-white hover:opacity-90">
              New round
            </button>
            <button onClick={onExit} className="rounded-lg border border-line px-5 py-2">Change setup</button>
          </>
        ) : (
          <>
            <button onClick={() => setDone(true)} className="rounded-lg bg-accent px-5 py-2 font-medium text-white hover:opacity-90">
              Finish
            </button>
            <span className="self-center text-xs text-muted">Click a chosen option again to clear it (blank = 0 b).</span>
          </>
        )}
      </div>
    </div>
  )
}
