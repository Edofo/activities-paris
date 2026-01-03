import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  max?: number
}

export const ProgressBar = ({
  value,
  max = 100,
  className,
  ...props
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      className={cn(
        'w-full h-2 bg-gray-200 rounded-full overflow-hidden',
        className,
      )}
      {...props}
    >
      <div
        className="h-full bg-[#e94560] transition-all duration-300 ease-out rounded-full"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  )
}
