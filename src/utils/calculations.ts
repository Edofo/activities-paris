import type { Activity } from '@/types'

export interface ActivityStats {
  activity: Activity
  likes: number
  dislikes: number
  total: number
  percentage: number
  voters: Array<string>
}

export const calculateVoteProgress = (
  currentIndex: number,
  totalActivities: number,
): number => {
  if (totalActivities === 0) return 0
  return Math.round((currentIndex / totalActivities) * 100)
}
