import { useState } from 'react'
import { Markdown } from '../../components/Markdown'
import { checkFill, checkMulti, checkNumeric, fillParts, type Question } from '../../core/questions'

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
  const [multi, setMulti] = useState<number[]>([])
  const [lastPicked, setLastPicked] = useState<number[]>([])
  const [freeShown, setFreeShown] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [fillInputs, setFillInputs] = useState<string[]>([])
  const [codeText, setCodeText] = useState(q.type === 'code' ? (q.starter ?? '') : '')
  const [ticked, setTicked] = useState<boolean[]>([])
  const hints = q.hints ?? []
  const selfGraded = q.type === 'free' || q.type === 'code'

  async function answer(correct: boolean) {
    setRevealed(correct)
    await onAnswer(correct)
  }

  return (
    <div className="space-y-4 text-base">
      <div className="text-[1.05rem] leading-relaxed"><Markdown>{q.prompt}</Markdown></div>

      {revealed === null && hintsShown > 0 && (
        <ol className="space-y-1 rounded border border-line bg-surface/50 p-2 text-sm">
          {hints.slice(0, hintsShown).map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-muted">Hint {i + 1}:</span>
              <Markdown>{h}</Markdown>
            </li>
          ))}
        </ol>
      )}

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
            className="rounded-lg border border-line px-3 py-1.5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="rounded-lg bg-accent px-4 py-1.5 font-medium text-white">Check</button>
        </form>
      )}

      {(q.type === 'choice' || q.type === 'multi') && (
        <div className="space-y-3">
          {q.type === 'multi' && revealed === null && (
            <p className="text-sm text-muted">Select all correct options ({q.answers.length} of {q.options.length}).</p>
          )}
          <ul className="space-y-2">
            {q.options.map((o, i) => {
              const picked = revealed === null ? (q.type === 'choice' ? choice === i : multi.includes(i)) : lastPicked.includes(i)
              const correct = q.type === 'choice' ? i === q.answer : q.answers.includes(i)
              const state =
                revealed === null
                  ? picked ? 'border-accent bg-accent/10' : 'border-line hover:border-line-strong'
                  : correct ? 'border-ok bg-ok-bg' : picked ? 'border-bad bg-warn-bg' : 'border-line opacity-70'
              return (
                <li key={i}>
                  <button
                    type="button"
                    disabled={revealed !== null}
                    aria-pressed={picked}
                    onClick={() =>
                      q.type === 'choice' ? setChoice(i) : setMulti((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]))
                    }
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left ${state}`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center border text-sm ${q.type === 'choice' ? 'rounded-full' : 'rounded-md'} ${picked ? 'border-accent bg-accent text-white' : 'border-line-strong'}`}
                    >
                      {picked ? '✓' : ''}
                    </span>
                    <span className="min-w-0"><Markdown>{o}</Markdown></span>
                    {revealed !== null && correct && <span className="ml-auto text-sm font-medium text-ok">correct</span>}
                  </button>
                </li>
              )
            })}
          </ul>
          {revealed === null && (
            <button
              disabled={q.type === 'choice' ? choice === null : multi.length === 0}
              className="rounded-lg bg-accent px-5 py-2 font-medium text-white disabled:opacity-40"
              onClick={() => {
                if (q.type === 'choice') {
                  setLastPicked(choice === null ? [] : [choice])
                  void answer(choice === q.answer)
                } else {
                  setLastPicked(multi)
                  void answer(checkMulti(q, multi))
                }
              }}
            >
              Check
            </button>
          )}
        </div>
      )}

      {revealed === null && q.type === 'fill' && (
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault()
            void answer(checkFill(q, fillInputs).every(Boolean))
          }}
        >
          <pre className="overflow-x-auto rounded border border-line bg-surface/50 p-2 font-mono text-sm leading-7">
            {fillParts(q.code).map((part, i, all) => (
              <span key={i}>
                {part}
                {i < all.length - 1 && (
                  <input
                    aria-label={`Blank ${i + 1}`}
                    className="mx-1 w-32 rounded border border-line bg-bg px-1 font-mono"
                    value={fillInputs[i] ?? ''}
                    onChange={(e) => setFillInputs(all.slice(0, -1).map((_, j) => (j === i ? e.target.value : (fillInputs[j] ?? ''))))}
                  />
                )}
              </span>
            ))}
          </pre>
          <button className="rounded-lg bg-accent px-4 py-1.5 font-medium text-white">Check</button>
        </form>
      )}

      {revealed === null && q.type === 'code' && !freeShown && (
        <textarea
          aria-label="Your code"
          rows={10}
          spellCheck={false}
          className="w-full rounded border border-line bg-surface/50 p-2 font-mono text-sm"
          value={codeText}
          onChange={(e) => setCodeText(e.target.value)}
        />
      )}

      {revealed === null && selfGraded && !freeShown && (
        <div className="flex gap-3">
        {hintsShown < hints.length && (
          <button className="rounded-lg border border-line px-4 py-1.5" onClick={() => setHintsShown(hintsShown + 1)}>
            {hintsShown === 0 ? 'Hint' : 'Next hint'}
          </button>
        )}
        <button className="rounded-lg bg-accent px-4 py-1.5 font-medium text-white" onClick={() => setFreeShown(true)}>
          Show solution
        </button>
        </div>
      )}
      {revealed === null && q.type === 'code' && freeShown && (
        <div className="space-y-2">
          <Markdown>{q.solution}</Markdown>
          <p className="text-sm text-muted">Tick what your code satisfies:</p>
          {q.checklist.map((item, i) => (
            <label key={i} className="flex items-center gap-2">
              <input type="checkbox" checked={ticked[i] ?? false} onChange={(e) => setTicked(q.checklist.map((_, j) => (j === i ? e.target.checked : (ticked[j] ?? false))))} />
              <Markdown>{item}</Markdown>
            </label>
          ))}
          <button className="rounded-lg bg-accent px-4 py-1.5 font-medium text-white" onClick={() => void answer(q.checklist.every((_, i) => ticked[i]))}>
            Done
          </button>
        </div>
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

      {revealed === null && !selfGraded && (
        <div className="flex gap-4 text-sm text-muted">
          {hintsShown < hints.length && (
            <button className="underline" onClick={() => setHintsShown(hintsShown + 1)}>
              {hintsShown === 0 ? 'Hint' : 'Next hint'}
            </button>
          )}
          <button className="underline" onClick={() => {
            setLastPicked([])
            void answer(false)
          }}>
            Give up, show solution
          </button>
        </div>
      )}

      {revealed !== null && (
        <div className="space-y-2">
          <p className={revealed ? 'font-medium text-ok' : 'font-medium text-bad'}>
            {revealed ? 'Correct' : 'Not quite'}
          </p>
          {!selfGraded && <Markdown>{q.solution}</Markdown>}
          <button className="rounded-lg bg-accent px-4 py-1.5 font-medium text-white" onClick={() => void onNext()}>
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  )
}
