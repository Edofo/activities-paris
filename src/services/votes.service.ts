import type { Vote, VoteChoice } from '@/types'
import type { VoteInsert, VoteRow, VoteUpdate } from '@/types/database'
import { database } from '@/constants/database'
import { supabase } from '@/lib/supabase'

export const votesService = {
  async getByUser(userId: string): Promise<Array<Vote>> {
    const { data, error } = await supabase
      .from(database.tables.votes)
      .select('*')
      .eq(database.columns.userId, userId)
      .order(database.columns.votedAt, { ascending: false })

    if (error) throw error
    return data.map(transformVoteFromDB)
  },

  async create(vote: VoteInsert): Promise<Vote> {
    const { data: existing, error: checkError } = await supabase
      .from(database.tables.votes)
      .select('id')
      .eq(database.columns.userId, vote.user_id)
      .eq(database.columns.activityId, vote.activity_id)
      .maybeSingle()

    if (checkError) throw checkError

    // @ts-expect-error - existing is not typed
    if (existing?.id) {
      // @ts-expect-error - existing is not typed
      return this.update(existing.id, vote.choice)
    }

    const insertData: VoteInsert = {
      user_id: vote.user_id,
      activity_id: vote.activity_id,
      choice: vote.choice,
      voted_at: vote.voted_at || new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from(database.tables.votes)
      // @ts-expect-error - insertData is not typed
      .insert(insertData)
      .select()
      .single()

    if (error) throw error
    return transformVoteFromDB(data)
  },

  async update(voteId: string, choice: VoteChoice): Promise<Vote> {
    const updateData: VoteUpdate = {
      choice,
      voted_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from(database.tables.votes)
      // @ts-expect-error - updateData is not typed
      .update(updateData)
      .eq(database.columns.id, voteId)
      .select()
      .single()

    if (error) throw error
    return transformVoteFromDB(data)
  },

  async deleteAllByUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from(database.tables.votes)
      .delete()
      .eq(database.columns.userId, userId)

    if (error) throw error
  },
}

const transformVoteFromDB = (dbVote: VoteRow): Vote => {
  return {
    activityId: dbVote.activity_id,
    choice: dbVote.choice as VoteChoice,
    votedAt: dbVote.voted_at,
  }
}
