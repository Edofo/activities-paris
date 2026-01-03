import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export const Avatar = ({
  name,
  size = 'md',
  className,
  ...props
}: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        'rounded-full bg-[#e94560] text-white flex items-center justify-center font-semibold',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  )
}
