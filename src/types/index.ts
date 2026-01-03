import type { Activity } from './activity'
import type {
  ActivityRow,
  UserInsert,
  UserRow,
  VoteInsert,
  VoteRow,
} from './database'

export * from './activity'
export * from './vote'
export * from './database'
export * from './database.types'

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
