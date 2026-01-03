import { Link, createFileRoute } from '@tanstack/react-router'
import { Trophy, Users } from 'lucide-react'
import { useMemo } from 'react'
import type { ActivityStats } from '@/utils/calculations'
import type { PriceRange } from '@/types'
import { useActivityRanking } from '@/queries/useActivitiesSupabase'
import { useUsers } from '@/queries/useVotesSupabase'
import { ActivityRanking } from '@/components/molecules/ActivityRanking'
import { Button } from '@/components/atoms/Button'
import { icons } from '@/styles'
import { ROUTES } from '@/constants'

const transformPriceRange = (priceRange: PriceRange): PriceRange => {
  switch (priceRange) {
    case 'gratuit':
      return 'gratuit'
    case '€':
      return '€'
    case '€€':
      return '€€'
    case '€€€':
      return '€€€'
  }
}

const HomePage = () => {
  const { largeIconSize, mediumIconSize } = icons

  const { data: ranking = [], isLoading: rankingLoading } = useActivityRanking()
  const { data: users = [], isLoading: usersLoading } = useUsers()

  const sortedStats = useMemo(() => {
    if (!ranking.length) return []
    return ranking.map((r) => ({
      activity: {
        id: r.id,
        name: r.name,
        description: r.description,
        category: r.category,
        imageUrl: r.imageUrl,
        location: r.location,
        arrondissement: r.arrondissement,
        priceRange: transformPriceRange(r.priceRange),
        duration: r.duration,
        tags: r.tags,
        website: r.website,
        alreadyDone: r.alreadyDone,
      },
      likes: r.likes,
      dislikes: r.dislikes,
      total: r.total_votes,
      percentage: r.like_percentage ?? 0,
      voters: [],
    })) as Array<ActivityStats>
  }, [ranking])

  const allVoters = useMemo(() => {
    return users.map((u) => u.name).sort()
  }, [users])

  const isLoading = rankingLoading || usersLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e94560] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const top3 = sortedStats.slice(0, 3)
  const others = sortedStats.slice(3)

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0f3460] mb-2">
            Paris Activities Vote
          </h1>
          <p className="text-gray-600">
            Discover the family's favorite activities
          </p>
        </div>

        {allVoters.length > 0 && (
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Users size={mediumIconSize} />
            <span>
              Family members: <strong>{allVoters.join(', ')}</strong>
            </span>
          </div>
        )}

        <div className="mb-8 text-center">
          <Link to={ROUTES.VOTE}>
            <Button variant="primary" size="lg">
              <Trophy className="mr-2" size={largeIconSize} />
              Vote now
            </Button>
          </Link>
        </div>

        {top3.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0f3460] mb-6 text-center">
              🏆 Podium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {top3[1] && (
                <div className="order-2 md:order-1">
                  <ActivityRanking stats={top3[1]} position={2} />
                </div>
              )}

              {top3[0] && (
                <div className="order-1 md:order-2">
                  <ActivityRanking stats={top3[0]} position={1} />
                </div>
              )}

              {top3[2] && (
                <div className="order-3">
                  <ActivityRanking stats={top3[2]} position={3} />
                </div>
              )}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#0f3460] mb-6">
              Full ranking
            </h2>
            <div className="space-y-4">
              {others.map((stats, index) => (
                <ActivityRanking
                  key={stats.activity.id}
                  stats={stats}
                  position={index + 4}
                />
              ))}
            </div>
          </div>
        )}

        {sortedStats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No votes have been recorded yet.
            </p>
            <Link to={ROUTES.VOTE}>
              <Button variant="primary">Start voting</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
