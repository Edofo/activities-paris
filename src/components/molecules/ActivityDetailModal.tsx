import { Clock, ExternalLink, Heart, MapPin, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { Activity, Vote } from '@/types'
import { VoteChoice } from '@/types/vote'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { cn } from '@/lib/utils'
import { getCategoryLabel } from '@/utils'
import { icons } from '@/styles'
import { ROUTES } from '@/constants'

export interface ActivityDetailModalProps {
  isOpen: boolean
  activity: Activity | null
  vote: Vote | null
  currentUserId: string | undefined
  onClose: () => void
  onVote: (activityId: string, choice: VoteChoice) => void
  isVoting?: boolean
}

export const ActivityDetailModal = ({
  isOpen,
  activity,
  vote,
  currentUserId,
  onClose,
  onVote,
  isVoting = false,
}: ActivityDetailModalProps) => {
  const [selectedChoice, setSelectedChoice] = useState<VoteChoice | null>(
    vote?.choice || null,
  )
  const { mediumIconSize, smallIconSize } = icons

  useEffect(() => {
    setSelectedChoice(vote?.choice || null)
  }, [vote])

  if (!isOpen || !activity) return null

  const priceLabels: Record<string, string> = {
    gratuit: 'Gratuit',
    '€': '€',
    '€€': '€€',
    '€€€': '€€€',
  }

  const handleVote = (choice: VoteChoice) => {
    if (!currentUserId) return
    setSelectedChoice(choice)
    onVote(activity.id, choice)
  }

  const hasVoted = vote !== null

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/80 flex items-center justify-center z-9999 p-4 overflow-y-auto',
      )}
      onClick={onClose}
    >
      <Card
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fermer"
          >
            <X size={mediumIconSize} />
          </button>
          <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={activity.imageUrl}
              alt={activity.name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <Badge variant={activity.category}>
                {getCategoryLabel(activity.category)}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="default">
                {priceLabels[activity.priceRange]}
              </Badge>
            </div>
            {activity.alreadyDone && (
              <div className="absolute bottom-4 left-4">
                <Badge variant="default" className="bg-green-500 text-white">
                  Déjà fait
                </Badge>
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-[#0f3460] pr-8">
            {activity.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-700">{activity.description}</p>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={mediumIconSize} className="mr-2 shrink-0" />
              <span>
                {activity.location} • {activity.arrondissement}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={mediumIconSize} className="mr-2 shrink-0" />
              <span>{activity.duration}</span>
            </div>
            {activity.website && (
              <div className="flex items-center text-sm">
                <ExternalLink size={mediumIconSize} className="mr-2 shrink-0" />
                <a
                  href={activity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e94560] hover:underline"
                >
                  Site web
                </a>
              </div>
            )}
          </div>

          {activity.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {activity.tags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {currentUserId ? (
            <div className="pt-4 border-t">
              {hasVoted ? (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Votre vote actuel
                  </h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVote(VoteChoice.Like)}
                      disabled={isVoting}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all',
                        selectedChoice === VoteChoice.Like
                          ? 'border-[#22c55e] bg-green-50 text-[#22c55e]'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                        isVoting && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      <Heart
                        size={smallIconSize}
                        className={cn(
                          selectedChoice === VoteChoice.Like && 'fill-current',
                        )}
                      />
                      <span className="font-semibold">J'aime</span>
                    </button>
                    <button
                      onClick={() => handleVote(VoteChoice.Dislike)}
                      disabled={isVoting}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all',
                        selectedChoice === VoteChoice.Dislike
                          ? 'border-[#ef4444] bg-red-50 text-[#ef4444]'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                        isVoting && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      <X
                        size={smallIconSize}
                        className={cn(
                          selectedChoice === VoteChoice.Dislike &&
                            'fill-current',
                        )}
                      />
                      <span className="font-semibold">Je n'aime pas</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Cliquez sur un bouton pour changer votre vote
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Voter pour cette activité
                  </h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVote(VoteChoice.Like)}
                      disabled={isVoting}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 hover:border-[#22c55e] hover:bg-green-50 hover:text-[#22c55e] transition-all',
                        isVoting && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      <Heart size={smallIconSize} />
                      <span className="font-semibold">J'aime</span>
                    </button>
                    <button
                      onClick={() => handleVote(VoteChoice.Dislike)}
                      disabled={isVoting}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 hover:border-[#ef4444] hover:bg-red-50 hover:text-[#ef4444] transition-all',
                        isVoting && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      <X size={smallIconSize} />
                      <span className="font-semibold">Je n'aime pas</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="pt-4 border-t">
              <Link to={ROUTES.VOTE} className="block">
                <Button variant="primary" className="w-full">
                  Commencer à voter
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
