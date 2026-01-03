import { Heart, RotateCcw, X } from 'lucide-react'
import { Button } from '../atoms/Button'

interface ActionButtonsProps {
  onDislike: () => void
  onLike: () => void
  onRewind: () => void
  canRewind: boolean
}

export const ActionButtons = ({
  onDislike,
  onLike,
  onRewind,
  canRewind,
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="danger"
        size="lg"
        onClick={onDislike}
        className="rounded-full w-16 h-16 p-0 flex items-center justify-center"
        aria-label="Dislike"
      >
        <X size={28} />
      </Button>

      <Button
        variant="secondary"
        size="lg"
        onClick={onRewind}
        disabled={!canRewind}
        className="rounded-full w-16 h-16 p-0 flex items-center justify-center disabled:opacity-30"
        aria-label="Rewind"
      >
        <RotateCcw size={28} />
      </Button>

      <Button
        variant="primary"
        size="lg"
        onClick={onLike}
        className="rounded-full w-16 h-16 p-0 flex items-center justify-center"
        aria-label="Like"
      >
        <Heart size={28} />
      </Button>
    </div>
  )
}
