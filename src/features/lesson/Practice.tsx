import { useState } from 'react'
import { starsFromScore } from '../../core/progress'
import type { Question } from '../../core/questions'
import type { Course } from '../../core/types'
import { courseSlug } from '../../content'
import { raiseStars, recordAnswer } from '../../hooks'
import { QuestionCard } from './QuestionCard'

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

  if (questions.length === 0) return <p className="text-sm text-muted">No practice questions yet.</p>

  if (index >= questions.length) {
    const stars = starsFromScore(correctCount, questions.length)
    return (
      <section className="rounded-xl border border-line bg-surface p-5 text-base">
        <p>
          Result: <strong>{correctCount} / {questions.length}</strong> – {'★'.repeat(stars) || 'no stars yet'}
        </p>
        <button
          className="mt-3 rounded-lg border border-line px-4 py-1.5"
          onClick={() => {
            setIndex(0)
            setCorrectCount(0)
          }}
        >
          Try again
        </button>
      </section>
    )
  }

  const q = questions[index]
  const last = index + 1 >= questions.length

  return (
    <section className="space-y-4 rounded-xl border border-line bg-surface p-5 text-base sm:p-6">
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-muted">Question {index + 1} / {questions.length}</p>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full bg-accent" style={{ width: `${(index / questions.length) * 100}%` }} /></div>
      </div>
      <QuestionCard
        key={q.id}
        q={q}
        nextLabel={last ? 'Finish' : 'Next'}
        onAnswer={async (correct) => {
          if (correct) setCorrectCount((c) => c + 1)
          await recordAnswer({
            questionId: `${courseSlug(course)}:${q.id}`,
            topic: q.topic ?? topic,
            lessonId,
            correct,
          })
        }}
        onNext={async () => {
          if (last) await raiseStars(lessonId, starsFromScore(correctCount, questions.length))
          setIndex(index + 1)
        }}
      />
    </section>
  )
}
