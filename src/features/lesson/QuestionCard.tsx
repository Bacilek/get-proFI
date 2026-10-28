import { useState } from 'react'
import { Markdown } from '../../components/Markdown'
import { checkNumeric, type Question } from '../../core/questions'

/** One question with its answer UI; call sites should `key` it by question id. */
export function QuestionCard({
  q,
  nextLabel,
  onAnswer,
  onNext,
}: {
  q: Question
  nextLabel: string
  onAnswer: (correct: boolean) => void | Promise<void>
  onNext: () => void | Promise<void>
}) {
  const [revealed, setRevealed] = useState<null | boolean>(null) // null = not answered; boolean = was correct
  const [input, setInput] = useState('')
  const [choice, setChoice] = useState<number | null>(null)
  const [freeShown, setFreeShown] = useState(false)

  async function answer(correct: boolean) {
    setRevealed(correct)
    await onAnswer(correct)
  }

  return (
    <div className="space-y-3">
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
            className="rounded border border-line px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="rounded bg-accent px-3 py-1 text-white">Check</button>
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
            className="rounded bg-accent px-3 py-1 text-white disabled:opacity-40"
            onClick={() => void answer(choice === q.answer)}
          >
            Check
          </button>
        </div>
      )}

      {revealed === null && q.type === 'free' && !freeShown && (
        <button className="rounded bg-accent px-3 py-1 text-white" onClick={() => setFreeShown(true)}>
          Show solution
        </button>
      )}
      {revealed === null && q.type === 'free' && freeShown && (
        <div className="space-y-2">
          <Markdown>{q.solution}</Markdown>
          <div className="flex gap-2">
            <button className="rounded border border-ok px-3 py-1" onClick={() => void answer(true)}>I had it</button>
            <button className="rounded border border-bad px-3 py-1" onClick={() => void answer(false)}>I missed it</button>
          </div>
        </div>
      )}

      {revealed !== null && (
        <div className="space-y-2">
          <p className={revealed ? 'font-medium text-ok' : 'font-medium text-bad'}>
            {revealed ? 'Correct' : 'Not quite'}
          </p>
          {q.type !== 'free' && <Markdown>{q.solution}</Markdown>}
          <button className="rounded bg-accent px-3 py-1 text-white" onClick={() => void onNext()}>
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  )
}
