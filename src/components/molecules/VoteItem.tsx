import { Edit, Heart, X } from 'lucide-react'
import type { Activity, Vote } from '@/types'
import { Card, CardContent } from '@/components/atoms/Card'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { icons } from '@/styles'
import { cn } from '@/lib/utils'
import { getCategoryLabel } from '@/utils'
import { VoteChoice } from '@/types'

export interface VoteItemProps {
  activity: Activity
  vote: Vote | null
  onEdit?: () => void
  className?: string
}

export const VoteItem = ({
  activity,
  vote,
  onEdit,
  className,
}: VoteItemProps) => {
  const { rankingImageSize, smallIconSize, mediumIconSize } = icons

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="flex gap-4">
        <div
          className="shrink-0 rounded-lg overflow-hidden bg-gray-200"
          style={{
            width: `${rankingImageSize}px`,
            height: `${rankingImageSize}px`,
          }}
        >
          <img
            src={activity.imageUrl}
            alt={activity.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <CardContent className="flex-1 p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#0f3460] mb-1 truncate">
              {activity.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant={activity.category}>
                {getCategoryLabel(activity.category)}
              </Badge>
              {vote ? (
                <Badge
                  variant={
                    vote.choice === VoteChoice.Like ? 'success' : 'danger'
                  }
                  className="flex items-center gap-1"
                >
                  {vote.choice === VoteChoice.Like ? (
                    <>
                      <Heart size={smallIconSize} /> Like
                    </>
                  ) : (
                    <>
                      <X size={smallIconSize} /> Dislike
                    </>
                  )}
                </Badge>
              ) : (
                <Badge variant="default">Non voté</Badge>
              )}
            </div>
          </div>

          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit} className="ml-4">
              <Edit size={mediumIconSize} />
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
