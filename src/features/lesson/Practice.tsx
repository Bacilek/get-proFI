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
      <section className="rounded-md border border-line bg-surface p-3 text-sm">
        <p>
          Result: <strong>{correctCount} / {questions.length}</strong> – {'★'.repeat(stars) || 'no stars yet'}
        </p>
        <button
          className="mt-2 rounded border border-line px-3 py-1"
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
    <section className="space-y-3 rounded-md border border-line bg-surface p-3 text-sm">
      <p className="text-muted">Question {index + 1} / {questions.length}</p>
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
