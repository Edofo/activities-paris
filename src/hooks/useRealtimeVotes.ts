import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { database, queryKeys } from '@/constants'

export const useRealtimeVotes = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const channel = supabase
      .channel(database.channels.votesChanges)
      .on(
        database.events.postgresChanges,
        {
          event: '*',
          schema: database.schema.public,
          table: database.tables.votes,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.votes.all })
          queryClient.invalidateQueries({
            queryKey: queryKeys.activities.ranking,
          })
          queryClient.invalidateQueries({ queryKey: queryKeys.activities.all })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}
