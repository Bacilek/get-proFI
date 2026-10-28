import Dexie, { type EntityTable } from 'dexie'
import type {
  Attempt,
  LessonProgress,
  MaterialSkip,
  MilestoneResult,
  ReviewState,
  TopicRating,
} from './types'

export class ProfiDB extends Dexie {
  lessons!: EntityTable<LessonProgress, 'lessonId'>
  attempts!: EntityTable<Attempt, 'id'>
  ratings!: EntityTable<TopicRating, 'topic'>
  reviews!: EntityTable<ReviewState, 'questionId'>
  results!: EntityTable<MilestoneResult, 'milestoneId'>
  skips!: EntityTable<MaterialSkip, 'id'>

  constructor(name = 'get-profi') {
    super(name)
    this.version(1).stores({
      lessons: 'lessonId',
      attempts: '++id, topic, lessonId, at',
      ratings: 'topic',
      reviews: 'questionId, due',
      results: 'milestoneId',
    })
    this.version(2).stores({ skips: 'id' })
  }
}

export const db = new ProfiDB()
