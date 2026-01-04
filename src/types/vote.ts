export enum VoteChoice {
  Like = 'like',
  Dislike = 'dislike',
}

export interface Vote {
  id?: string
  activityId: string
  choice: VoteChoice
  votedAt: string
}

export interface UserVotes {
  userId: string
  userName: string
  votes: Array<Vote>
  completedAt?: string
}

export interface VoteSession {
  currentIndex: number
  isCompleted: boolean
}
