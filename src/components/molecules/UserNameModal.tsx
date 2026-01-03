import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'

export interface UserNameModalProps {
  isOpen: boolean
  onConfirm: (name: string) => void
  className?: string
}

export const UserNameModal = ({
  isOpen,
  onConfirm,
  className,
}: UserNameModalProps) => {
  const [name, setName] = useState<string>('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onConfirm(name.trim())
      setName('')
    }
  }

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
        className,
      )}
      onClick={() => {}}
    >
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>Quel est votre prénom ?</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre prénom"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              autoFocus
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={!name.trim()}
            >
              Commencer à voter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
