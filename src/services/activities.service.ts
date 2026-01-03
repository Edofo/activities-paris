import type { Activity, ActivityWithRanking } from '@/types'
import type { ActivityRankingRow, ActivityRow } from '@/types/database'
import { database } from '@/constants/database'
import { supabase } from '@/lib/supabase'

export const activitiesService = {
  async getAll(): Promise<Array<Activity>> {
    const { data, error } = await supabase
      .from(database.tables.activities)
      .select('*')
      .order(database.columns.name, { ascending: true })

    if (error) throw error
    return data.map(transformActivityFromDB)
  },

  async getRanking(): Promise<Array<ActivityWithRanking>> {
    const { data, error } = await supabase
      .from(database.views.activityRankings)
      .select('*')
      .order(database.columns.likes, { ascending: false })

    if (error) throw error
    return data.map(transformActivityRankingFromDB)
  },

  async getUnvotedByUser(userId: string): Promise<Array<Activity>> {
    const allActivities = await this.getAll()
    const { data: votes, error } = await supabase
      .from(database.tables.votes)
      .select(database.columns.activityId)
      .eq(database.columns.userId, userId)

    if (error) throw error

    const votedActivityIds = new Set(
      votes.map((v: { activity_id: string }) => v.activity_id),
    )
    return allActivities.filter((a) => !votedActivityIds.has(a.id))
  },
}

const transformActivityFromDB = (dbActivity: ActivityRow): Activity => {
  return {
    id: dbActivity.id,
    name: dbActivity.name,
    description: dbActivity.description || '',
    category: dbActivity.category,
    imageUrl: dbActivity.image_url,
    location: dbActivity.location || '',
    arrondissement: dbActivity.arrondissement || '',
    priceRange: transformPriceRange(dbActivity.price_range),
    duration: dbActivity.duration || '',
    tags: dbActivity.tags || [],
    website: dbActivity.website || undefined,
    alreadyDone: dbActivity.already_done,
  }
}

const transformActivityRankingFromDB = (
  dbRanking: ActivityRankingRow,
): ActivityWithRanking => {
  const activity = transformActivityFromDB(dbRanking)
  return {
    ...activity,
    likes: dbRanking.likes,
    dislikes: dbRanking.dislikes,
    total_votes: dbRanking.total_votes,
    like_percentage: dbRanking.like_percentage,
  }
}

const transformPriceRange = (
  priceRange: 'gratuit' | 'euro' | 'euro2' | 'euro3' | null,
): 'gratuit' | '€' | '€€' | '€€€' => {
  switch (priceRange) {
    case 'gratuit':
      return 'gratuit'
    case 'euro':
      return '€'
    case 'euro2':
      return '€€'
    case 'euro3':
      return '€€€'
    default:
      return '€'
  }
}
