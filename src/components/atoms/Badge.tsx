import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import type { ActivityCategory } from '@/types'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        jardin: 'bg-purple-100 text-purple-800',
        parc: 'bg-orange-100 text-orange-800',
        chateau: 'bg-blue-100 text-blue-800',
        musee: 'bg-green-100 text-green-800',
        expo: 'bg-pink-100 text-pink-800',
        spectacle: 'bg-yellow-100 text-yellow-800',
        quartier: 'bg-gray-100 text-gray-800',
        tourisme_historique: 'bg-purple-100 text-purple-800',
        autre: 'bg-gray-100 text-gray-800',
        success: 'bg-[#22c55e] text-white',
        danger: 'bg-[#ef4444] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'variant'>,
    VariantProps<typeof badgeVariants> {
  variant?: VariantProps<typeof badgeVariants>['variant'] | ActivityCategory
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'
