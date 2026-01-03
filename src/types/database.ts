import type { Database } from './database.types'

export type { Database }

export type UsersTable = Database['public']['Tables']['users']
export type ActivitiesTable = Database['public']['Tables']['activities']
export type VotesTable = Database['public']['Tables']['votes']

export type UserRow = UsersTable['Row']
export type UserInsert = UsersTable['Insert']
export type UserUpdate = UsersTable['Update']

export type ActivityRow = ActivitiesTable['Row']
export type ActivityInsert = ActivitiesTable['Insert']
export type ActivityUpdate = ActivitiesTable['Update']

export type VoteRow = VotesTable['Row']
export type VoteInsert = VotesTable['Insert']
export type VoteUpdate = VotesTable['Update']

export type ActivityRankingsView =
  Database['public']['Views']['activity_rankings']
export type ActivityRankingRow = ActivityRankingsView['Row']
