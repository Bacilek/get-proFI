import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from '../components/Charts'
import { courses, loadQuestionIndex, type IndexedQuestion } from '../content'
import { generate, generators } from '../core/drill'
import { weakestTopics } from '../core/progress'
import { QuestionCard } from '../features/lesson/QuestionCard'
import { recordAnswer, recordAttempt, useAttempts, useDueReviews, useRatings } from '../hooks'

const topicLabel = (topic: string) => {
  const [code, id] = topic.split(':')
  const lesson = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons)).find((l) => l.id === topic)
  return `${code.toUpperCase()} · ${lesson?.title ?? id}`
}

function DueReviews({ now }: { now: number }) {
  const due = useDueReviews(now)
  const [index, setIndex] = useState<Map<string, IndexedQuestion> | null>(null)
  const [frozen, setFrozen] = useState<string[] | null>(null)
  const [pos, setPos] = useState(0)
  useEffect(() => {
    void loadQuestionIndex().then(setIndex)
  }, [])

  // The queue is frozen at the first answer so answering does not reshuffle it under the user.
  const live = index && due ? due.filter((id) => index.has(id)) : null
  const session = frozen ?? live

  if (!index || !session) return <p className="text-sm text-muted">Loading…</p>
  if (session.length === 0) return <p className="text-sm text-muted">Nothing due. Answer lesson questions and they will come back here.</p>
  const id = session[pos]
  if (!id) return <p className="text-sm text-ok">Review done for now.</p>
  const { question, lessonId } = index.get(id)!
  return (
    <div className="space-y-2 rounded-md border border-line bg-surface p-3 text-sm">
      <p className="text-muted">Due {pos + 1} / {session.length}</p>
      <QuestionCard
        key={id}
        q={question}
        nextLabel="Next"
        onAnswer={(correct) => {
          setFrozen(session)
          return recordAnswer({ questionId: id, topic: question.topic ?? lessonId, lessonId, correct })
        }}
        onNext={() => setPos(pos + 1)}
      />
    </div>
  )
}

function Drill() {
  const [topic, setTopic] = useState(generators[0].topic)
  const [seed, setSeed] = useState(() => Date.now() % 1_000_000)
  const q = generate(topic, seed)!
  return (
    <div className="space-y-2 rounded-md border border-line bg-surface p-3 text-sm">
      <select
        aria-label="Drill topic"
        className="rounded border border-line bg-surface px-2 py-1"
        value={topic}
        onChange={(e) => {
          setTopic(e.target.value)
          setSeed((s) => s + 1)
        }}
      >
        {generators.map((g) => (
          <option key={g.topic} value={g.topic}>{g.title}</option>
        ))}
      </select>
      <QuestionCard
        key={q.id}
        q={q}
        nextLabel="New problem"
        onAnswer={async (correct) => {
          await recordAttempt({ questionId: q.id, topic, lessonId: topic, correct })
        }}
        onNext={() => setSeed((s) => s + 1)}
      />
    </div>
  )
}

function Gaps() {
  const attempts = useAttempts()
  const ratings = useRatings()
  const topics = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.flatMap((l) => l.topics)))
  const weak = weakestTopics([...new Set(topics)], attempts, ratings).slice(0, 8)
  return (
    <ul className="space-y-1 text-sm">
      {weak.map(({ topic, mastery }) => (
        <li key={topic} className="flex items-center gap-3">
          <Link to={`/c/${topic.split(':')[0]}/l/${topic.split(':')[1]}`} className="w-72 truncate hover:underline">
            {topicLabel(topic)}
          </Link>
          <span className="w-40"><Bar value={mastery ?? 0} tone="accent" /></span>
          <span className="text-xs text-muted">{mastery === null ? 'no data' : `${Math.round(mastery * 100)} %`}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Review() {
  const [now] = useState(() => Date.now())
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Review</h1>
      <section><h2 className="mb-2 text-lg font-semibold">Due questions</h2><DueReviews now={now} /></section>
      <section><h2 className="mb-2 text-lg font-semibold">Weakest topics</h2><Gaps /></section>
      <section><h2 className="mb-2 text-lg font-semibold">Drill</h2><Drill /></section>
    </div>
  )
}
