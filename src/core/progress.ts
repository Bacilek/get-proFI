import type { Attempt, GlobalId, LessonProgress, TopicRating } from './types'

/** Stars awarded for a practice round: 90 % = 3, 70 % = 2, 50 % = 1. */
export function starsFromScore(correct: number, total: number): LessonProgress['stars'] {
  if (total <= 0) return 0
  const ratio = correct / total
  if (ratio >= 0.9) return 3
  if (ratio >= 0.7) return 2
  if (ratio >= 0.5) return 1
  return 0
}

const RECENT_ATTEMPTS = 10

/**
 * Mastery of a topic in [0, 1], or null when there is no data at all.
 * Blends accuracy over the most recent attempts (60 %) with self-rating (40 %);
 * if only one source exists, that one is used alone.
 */
export function topicMastery(
  topic: GlobalId,
  attempts: readonly Attempt[],
  rating: TopicRating | undefined,
): number | null {
  const recent = attempts
    .filter((a) => a.topic === topic)
    .sort((a, b) => b.at - a.at)
    .slice(0, RECENT_ATTEMPTS)
  const accuracy = recent.length > 0 ? recent.filter((a) => a.correct).length / recent.length : null
  const self = rating ? (rating.rating - 1) / 4 : null
  if (accuracy !== null && self !== null) return 0.6 * accuracy + 0.4 * self
  return accuracy ?? self
}

/** Topics sorted from weakest to strongest; topics without data come first (unknown = risk). */
export function weakestTopics(
  topics: readonly GlobalId[],
  attempts: readonly Attempt[],
  ratings: ReadonlyMap<GlobalId, TopicRating>,
): { topic: GlobalId; mastery: number | null }[] {
  return topics
    .map((topic) => ({ topic, mastery: topicMastery(topic, attempts, ratings.get(topic)) }))
    .sort((a, b) => (a.mastery ?? -1) - (b.mastery ?? -1))
}
