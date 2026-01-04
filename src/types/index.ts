import type { Activity } from './activity'
import type {
  ActivityRow,
  UserInsert,
  UserRow,
  VoteInsert,
  VoteRow,
} from './database'

// Re-export all types and values from sub-modules
export * from './activity'
export * from './database'
export * from './database.types'

// Explicitly export VoteChoice enum to avoid hoisting issues in production
export { VoteChoice } from './vote'
export type { Vote, UserVotes, VoteSession } from './vote'

export type User = UserRow
export type ActivityDB = ActivityRow
export type VoteDB = VoteRow

export type NewUser = UserInsert
export type NewVote = VoteInsert

export interface ActivityWithRanking extends Activity {
  likes: number
  dislikes: number
  total_votes: number
  like_percentage: number | null
}
