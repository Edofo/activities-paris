import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UserVotes, Vote, VoteChoice, VoteSession } from '@/types'
import { queryKeys } from '@/constants'
import {
  generateUserId,
  getCurrentUser,
  getUsers,
  getVoteSession,
  resetVoteSession,
  saveUser,
  saveVoteSession,
} from '@/utils/storage'

export const useUsers = () => {
  return useQuery<Array<UserVotes>>({
    queryKey: queryKeys.users.all,
    queryFn: () => getUsers(),
    staleTime: 0,
  })
}

export const useCurrentUser = () => {
  return useQuery<UserVotes | null>({
    queryKey: queryKeys.users.current,
    queryFn: () => getCurrentUser(),
    staleTime: 0,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userName: string) => {
      const userId = generateUserId()
      const newUser: UserVotes = {
        userId,
        userName,
        votes: [],
      }
      saveUser(newUser)
      return Promise.resolve(newUser)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.current })
    },
  })
}

export const useAddVote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      activityId,
      choice,
    }: {
      activityId: string
      choice: VoteChoice
    }) => {
      const currentUser = getCurrentUser()
      if (!currentUser) {
        throw new Error('Aucun utilisateur connecté')
      }

      const existingVoteIndex = currentUser.votes.findIndex(
        (v) => v.activityId === activityId,
      )

      const newVote: Vote = {
        activityId,
        choice,
        votedAt: new Date().toISOString(),
      }

      if (existingVoteIndex >= 0) {
        currentUser.votes[existingVoteIndex] = newVote
      } else {
        currentUser.votes.push(newVote)
      }

      saveUser(currentUser)
      return Promise.resolve(currentUser)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.current })
    },
  })
}

export const useVoteSession = () => {
  return useQuery<VoteSession | null>({
    queryKey: queryKeys.session.vote,
    queryFn: () => getVoteSession(),
    staleTime: 0,
  })
}

export const useUpdateVoteSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (session: VoteSession) => {
      saveVoteSession(session)
      return Promise.resolve(session)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session.vote })
    },
  })
}

export const useResetUserVotes = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      const currentUser = getCurrentUser()
      if (!currentUser) {
        throw new Error('Aucun utilisateur connecté')
      }

      const resetUser: UserVotes = {
        ...currentUser,
        votes: [],
        completedAt: undefined,
      }

      saveUser(resetUser)
      resetVoteSession()
      return Promise.resolve(resetUser)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.current })
      queryClient.invalidateQueries({ queryKey: queryKeys.session.vote })
    },
  })
}
