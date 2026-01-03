import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  size?: number
}

export const Icon = ({
  icon: IconComponent,
  size = 24,
  className,
  ...props
}: IconProps) => {
  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <IconComponent size={size} />
    </div>
  )
}
