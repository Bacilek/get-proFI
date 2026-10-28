import { useState } from 'react'
import { Markdown } from '../../components/Markdown'
import { checkNumeric, type Question } from '../../core/questions'
import { starsFromScore } from '../../core/progress'
import type { Course } from '../../core/types'
import { courseSlug } from '../../content'
import { raiseStars, recordAttempt } from '../../hooks'

export function Practice({
  course,
  lessonId,
  topic,
  questions,
}: {
  course: Course
  lessonId: string
  topic: string
  questions: Question[]
}) {
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [revealed, setRevealed] = useState<null | boolean>(null) // null = not answered; boolean = was correct
  const [input, setInput] = useState('')
  const [choice, setChoice] = useState<number | null>(null)
  const [freeShown, setFreeShown] = useState(false)

  if (questions.length === 0) return <p className="text-sm text-slate-500">No practice questions yet.</p>

  if (index >= questions.length) {
    const stars = starsFromScore(correctCount, questions.length)
    return (
      <section className="rounded-md border border-slate-200 bg-white p-3 text-sm">
        <p>
          Result: <strong>{correctCount} / {questions.length}</strong> – {'★'.repeat(stars) || 'no stars yet'}
        </p>
        <button
          className="mt-2 rounded border border-slate-300 px-3 py-1"
          onClick={() => {
            setIndex(0)
            setCorrectCount(0)
            setRevealed(null)
            setInput('')
            setChoice(null)
            setFreeShown(false)
          }}
        >
          Try again
        </button>
      </section>
    )
  }

  const q = questions[index]

  async function answer(correct: boolean) {
    setRevealed(correct)
    if (correct) setCorrectCount((c) => c + 1)
    await recordAttempt({
      questionId: `${courseSlug(course)}:${q.id}`,
      topic: q.topic ?? topic,
      lessonId,
      correct,
    })
  }

  async function next() {
    const last = index + 1 >= questions.length
    if (last) await raiseStars(lessonId, starsFromScore(correctCount, questions.length))
    setIndex(index + 1)
    setRevealed(null)
    setInput('')
    setChoice(null)
    setFreeShown(false)
  }

  return (
    <section className="space-y-3 rounded-md border border-slate-200 bg-white p-3 text-sm">
      <p className="text-slate-500">Question {index + 1} / {questions.length}</p>
      <Markdown>{q.prompt}</Markdown>

      {revealed === null && q.type === 'numeric' && (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            void answer(checkNumeric(q, input))
          }}
        >
          <input
            aria-label="Answer"
            className="rounded border border-slate-300 px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="rounded bg-slate-800 px-3 py-1 text-white">Check</button>
        </form>
      )}

      {revealed === null && q.type === 'choice' && (
        <div className="space-y-1">
          {q.options.map((o, i) => (
            <label key={i} className="flex items-center gap-2">
              <input type="radio" name={`q-${q.id}`} checked={choice === i} onChange={() => setChoice(i)} />
              <Markdown>{o}</Markdown>
            </label>
          ))}
          <button
            disabled={choice === null}
            className="rounded bg-slate-800 px-3 py-1 text-white disabled:opacity-40"
            onClick={() => void answer(choice === q.answer)}
          >
            Check
          </button>
        </div>
      )}

      {revealed === null && q.type === 'free' && !freeShown && (
        <button className="rounded bg-slate-800 px-3 py-1 text-white" onClick={() => setFreeShown(true)}>
          Show solution
        </button>
      )}
      {revealed === null && q.type === 'free' && freeShown && (
        <div className="space-y-2">
          <Markdown>{q.solution}</Markdown>
          <div className="flex gap-2">
            <button className="rounded border border-green-600 px-3 py-1" onClick={() => void answer(true)}>I had it</button>
            <button className="rounded border border-red-500 px-3 py-1" onClick={() => void answer(false)}>I missed it</button>
          </div>
        </div>
      )}

      {revealed !== null && (
        <div className="space-y-2">
          <p className={revealed ? 'font-medium text-green-700' : 'font-medium text-red-600'}>
            {revealed ? 'Correct' : 'Not quite'}
          </p>
          {q.type !== 'free' && <Markdown>{q.solution}</Markdown>}
          <button className="rounded bg-slate-800 px-3 py-1 text-white" onClick={() => void next()}>
            {index + 1 >= questions.length ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </section>
  )
}
