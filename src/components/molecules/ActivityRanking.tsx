import { Award, Medal, Trophy } from 'lucide-react'
import type { ActivityStats } from '@/utils/calculations'
import { Card, CardContent } from '@/components/atoms/Card'
import { Badge } from '@/components/atoms/Badge'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { icons } from '@/styles'
import { cn } from '@/lib/utils'
import { getCategoryLabel } from '@/utils'

export interface ActivityRankingProps {
  stats: ActivityStats
  position: number
  className?: string
}

export const ActivityRanking = ({
  stats,
  position,
  className,
}: ActivityRankingProps) => {
  const { medalSize, rankingImageSize, rankingPositionSize } = icons

  const getMedalIcon = () => {
    const iconSize = `${medalSize}px`
    if (position === 1)
      return (
        <Trophy
          style={{ width: iconSize, height: iconSize }}
          className="text-yellow-500"
        />
      )
    if (position === 2)
      return (
        <Medal
          style={{ width: iconSize, height: iconSize }}
          className="text-gray-400"
        />
      )
    if (position === 3)
      return (
        <Award
          style={{ width: iconSize, height: iconSize }}
          className="text-amber-600"
        />
      )
    return null
  }

  const getMedalBg = () => {
    if (position === 1) return 'bg-yellow-50 border-yellow-200'
    if (position === 2) return 'bg-gray-50 border-gray-200'
    if (position === 3) return 'bg-amber-50 border-amber-200'
    return ''
  }

  return (
    <Card
      className={cn(
        'transition-all hover:shadow-lg',
        position <= 3 && getMedalBg(),
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: `${rankingPositionSize}px`,
              height: `${rankingPositionSize}px`,
            }}
          >
            {position <= 3 ? (
              getMedalIcon()
            ) : (
              <span className="text-2xl font-bold text-gray-400">
                {position}
              </span>
            )}
          </div>

          <div
            className="shrink-0 rounded-lg overflow-hidden bg-gray-200"
            style={{
              width: `${rankingImageSize}px`,
              height: `${rankingImageSize}px`,
            }}
          >
            <img
              src={stats.activity.imageUrl}
              alt={stats.activity.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-[#0f3460] truncate">
                {stats.activity.name}
              </h3>
              <Badge variant={stats.activity.category}>
                {getCategoryLabel(stats.activity.category)}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="text-[#22c55e] font-semibold">
                  {stats.likes} ❤️
                </span>
                <span className="text-[#ef4444]">{stats.dislikes} 👎</span>
                <span className="text-gray-500">
                  {stats.total} vote{stats.total > 1 ? 's' : ''}
                </span>
              </div>

              <ProgressBar value={stats.percentage} />

              {stats.voters.length > 0 && (
                <p className="text-xs text-gray-500">
                  Voté par: {stats.voters.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
