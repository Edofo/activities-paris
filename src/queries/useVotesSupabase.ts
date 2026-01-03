import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { User, Vote, VoteChoice, VoteInsert } from '@/types'
import { queryKeys } from '@/constants'
import { usersService, votesService } from '@/services'

export const useUserVotes = (userId: string | undefined) => {
  return useQuery<Array<Vote>>({
    queryKey: queryKeys.votes.byUser(userId!),
    queryFn: () => votesService.getByUser(userId!),
    enabled: !!userId,
  })
}

export const useCreateVote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (vote: VoteInsert) => votesService.create(vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.votes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.ranking })
    },
  })
}

export const useUpdateVote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ voteId, choice }: { voteId: string; choice: VoteChoice }) =>
      votesService.update(voteId, choice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.votes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.ranking })
    },
  })
}

export const useResetVotes = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => votesService.deleteAllByUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.votes.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.ranking })
    },
  })
}

export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: queryKeys.users.current,
    queryFn: usersService.getCurrent,
    staleTime: 0,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name: string) => usersService.create(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.current })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}

export const useUsers = () => {
  return useQuery<Array<User>>({
    queryKey: queryKeys.users.all,
    queryFn: usersService.getAll,
  })
}
