import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[#e94560] text-white hover:bg-[#d63a52] active:scale-95 shadow-md hover:shadow-lg',
        secondary:
          'bg-[#0f3460] text-white hover:bg-[#0a2540] active:scale-95 shadow-md hover:shadow-lg',
        ghost:
          'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900',
        danger:
          'bg-[#ef4444] text-white hover:bg-[#dc2626] active:scale-95 shadow-md hover:shadow-lg',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
