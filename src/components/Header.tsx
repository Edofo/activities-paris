import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Home, Menu, Vote, X } from 'lucide-react'
import { useCurrentUser } from '@/queries/useVotesSupabase'
import { icons } from '@/styles'
import { Avatar } from '@/components/atoms/Avatar'
import { ROUTES } from '@/constants'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: currentUser } = useCurrentUser()
  const { xlIconSize, largeIconSize } = icons

  return (
    <>
      <header className="p-4 flex items-center justify-between bg-[#16213e] text-white shadow-lg relative z-[60]">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-[#0f3460] rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={xlIconSize} />
          </button>
          <h1 className="ml-4 text-xl font-semibold">
            <Link
              to={ROUTES.HOME}
              className="hover:opacity-80 transition-opacity"
            >
              Paris Activities Vote
            </Link>
          </h1>
        </div>

        {currentUser && (
          <div className="flex items-center gap-2">
            <Avatar name={currentUser.name} size="sm" />
            <span className="hidden sm:inline text-sm">{currentUser.name}</span>
          </div>
        )}
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-[#16213e] text-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#0f3460]">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-[#0f3460] rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={xlIconSize} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to={ROUTES.HOME}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#0f3460] transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-[#e94560] hover:bg-[#d63a52] transition-colors mb-2',
            }}
          >
            <Home size={largeIconSize} />
            <span className="font-medium">Accueil</span>
          </Link>

          <Link
            to={ROUTES.VOTE}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#0f3460] transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-[#e94560] hover:bg-[#d63a52] transition-colors mb-2',
            }}
          >
            <Vote size={largeIconSize} />
            <span className="font-medium">Voter</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}

export default Header
