import { useMemo } from 'react'
import type { Vote } from '@/types'
import { getCurrentUser, getUsers } from '@/utils/storage'

export const useLocalVotes = (
  sessionId: string,
  sessionName: string,
): { votes: Array<Vote> } => {
  const votes = useMemo(() => {
    // Try to get votes from current user first
    const currentUser = getCurrentUser()
    if (currentUser?.votes) {
      return currentUser.votes
    }

    // If sessionId looks like a userId, try to find that user
    if (sessionId) {
      const users = getUsers()
      const user = users.find((u) => u.userId === sessionId)
      if (user?.votes) {
        return user.votes
      }
    }

    // Return empty array if no votes found
    return []
  }, [sessionId, sessionName])

  return { votes }
}
