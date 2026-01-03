import { Clock, MapPin } from 'lucide-react'
import type { Activity } from '@/types'
import { Card, CardContent } from '@/components/atoms/Card'
import { Badge } from '@/components/atoms/Badge'
import { container, icons, spacing } from '@/styles'
import { cn } from '@/lib/utils'

export interface ActivityCardProps {
  activity: Activity
  className?: string
  showDescription?: boolean
}

export const ActivityCard = ({
  activity,
  className,
  showDescription = true,
}: ActivityCardProps) => {
  const { mediumIconSize } = icons
  const { cardImageHeight } = container
  const { badgeOffset, maxTagsDisplay } = spacing

  const priceLabels: Record<string, string> = {
    gratuit: 'Gratuit',
    '€': '€',
    '€€': '€€',
    '€€€': '€€€',
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div
        className="relative bg-gray-200"
        style={{ height: `${cardImageHeight}px` }}
      >
        <img
          src={activity.imageUrl}
          alt={activity.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute"
          style={{ top: `${badgeOffset}px`, left: `${badgeOffset}px` }}
        >
          <Badge variant={activity.category}>{activity.category}</Badge>
        </div>
        <div
          className="absolute"
          style={{ top: `${badgeOffset}px`, right: `${badgeOffset}px` }}
        >
          <Badge variant="default">{priceLabels[activity.priceRange]}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold text-[#0f3460] mb-2">
          {activity.name}
        </h3>
        {showDescription && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {activity.description}
          </p>
        )}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={mediumIconSize} className="mr-2" />
            <span>{activity.location}</span>
            <span className="mx-2">•</span>
            <span>{activity.arrondissement}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={mediumIconSize} className="mr-2" />
            <span>{activity.duration}</span>
          </div>
          {activity.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {activity.tags.slice(0, maxTagsDisplay).map((tag) => (
                <Badge key={tag} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
