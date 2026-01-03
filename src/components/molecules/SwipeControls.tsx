import { Heart, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { icons } from '@/styles'
import { cn } from '@/lib/utils'

export interface SwipeControlsProps {
  onDislike: () => void
  onRewind: () => void
  onLike: () => void
  canRewind?: boolean
  className?: string
}

export const SwipeControls = ({
  onDislike,
  onRewind,
  onLike,
  canRewind = false,
  className,
}: SwipeControlsProps) => {
  const { heartSize, xSize, controlButtonSize } = icons

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4 p-4 bg-white rounded-full shadow-lg',
        className,
      )}
    >
      <Button
        variant="danger"
        size="lg"
        onClick={onDislike}
        className="rounded-full p-0"
        style={{
          width: `${controlButtonSize}px`,
          height: `${controlButtonSize}px`,
        }}
        aria-label="Dislike"
      >
        <X size={xSize} />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={onRewind}
        disabled={!canRewind}
        className="rounded-full p-0 disabled:opacity-30"
        style={{
          width: `${controlButtonSize}px`,
          height: `${controlButtonSize}px`,
        }}
        aria-label="Rewind"
      >
        <RotateCcw size={xSize} />
      </Button>

      <Button
        variant="primary"
        size="lg"
        onClick={onLike}
        className="rounded-full p-0"
        style={{
          width: `${controlButtonSize}px`,
          height: `${controlButtonSize}px`,
        }}
        aria-label="Like"
      >
        <Heart size={heartSize} />
      </Button>
    </div>
  )
}
