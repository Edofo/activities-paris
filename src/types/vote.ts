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
