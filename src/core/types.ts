/** Global id of a lesson/topic: `<courseCode>:<localId>` (lowercase course code), e.g. `mb142:limits`. */
export type GlobalId = string

export type MilestoneType =
  | 'quiz'
  | 'midterm'
  | 'assignment'
  | 'project'
  | 'presentation'
  | 'exam'

export interface Milestone {
  id: string
  title: string
  type: MilestoneType
  /** ISO date (YYYY-MM-DD); undefined = not announced yet (TBD). */
  date?: string
  maxPoints?: number
  /** Points needed to pass this milestone on its own, if any. */
  minPoints?: number
  /** Exams and midterms are shown as "boss" nodes on the roadmap. */
  boss?: boolean
  /** Start time (HH:MM), shown next to the date. */
  time?: string
  /** Extra details shown as bullets in a tooltip on hover (duration, rules, ...). */
  info?: string | string[]
  /** Points accumulate over the semester: stays upcoming (and editable) after a partial result is entered. */
  cumulative?: boolean
  /** Module ids whose lessons this milestone tests (used for readiness on the roadmap). */
  coversModules?: string[]
}

/** Kinds of course material the user uploads into `sources/<CODE>/` (folders Lectures, Seminars, ROPOTs, Syllabus). */
export type MaterialKind = 'lecture' | 'seminar' | 'ropot' | 'syllabus'

export interface LessonMeta {
  id: GlobalId
  title: string
  /** Semester week in which the topic is taught. */
  week?: number
  /** Global ids of lessons that should be done first (may point to other courses). */
  prerequisites: GlobalId[]
  /** Global topic tags used for gap tracking. */
  topics: GlobalId[]
}

export interface Module {
  id: string
  title: string
  lessons: LessonMeta[]
}

/** Course-specific grading rule, e.g. "need 20 points at the exam, 15 with the bonus". */
export interface ExamRule {
  maxPoints: number
  requiredPoints: number
  /** Points carried to the exam from earlier work (user-specific, lowers requirement). */
  bonusPoints?: number
  /** Requirement after the bonus is granted. */
  requiredWithBonus?: number
  /** The bonus is granted when this milestone result reaches `minPoints`. */
  bonusFrom?: { milestoneId: string; minPoints: number }
}

export interface Course {
  code: string
  title: string
  semester: string
  /** Date (ISO) of semester week 1 start. */
  semesterStart: string
  exam?: ExamRule
  modules: Module[]
  milestones: Milestone[]
  /**
   * Material kinds this course uses (a kind is absent when its folder was deleted) mapped to the
   * earliest semester week whose material is not processed yet. The app asks for those weeks that
   * have already started, unless the user skipped them.
   */
  materials?: Partial<Record<MaterialKind, number>>
  /** Information the user still has to provide (shown as a warning on the course). */
  openItems?: { id: string; text: string }[]
  /** Known results, seeded into the database once (user can edit them later). */
  initialResults?: { milestoneId: string; points: number }[]
}

// --- user progress (stored in IndexedDB) ---

export interface LessonProgress {
  lessonId: GlobalId
  /** 0 = untouched, 1-3 = how well the practice went. */
  stars: 0 | 1 | 2 | 3
  updatedAt: number
}

export interface Attempt {
  id?: number
  questionId: string
  topic: GlobalId
  lessonId: GlobalId
  correct: boolean
  at: number
}

export interface TopicRating {
  topic: GlobalId
  /** Self-assessment 1 (lost) - 5 (solid). */
  rating: 1 | 2 | 3 | 4 | 5
  at: number
}

export interface ReviewState {
  questionId: string
  ease: number
  /** Interval in days. */
  interval: number
  reps: number
  /** Epoch ms when the question is due. */
  due: number
}

export interface MilestoneResult {
  milestoneId: string
  points: number
  at: number
}

/** The user said there is no material of this kind for this week; id = `<course>:<kind>:<week>`. */
export interface MaterialSkip {
  id: string
  at: number
}
