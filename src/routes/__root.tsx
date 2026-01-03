import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type { QueryClient } from '@tanstack/react-query'
import { useRealtimeVotes } from '@/hooks/useRealtimeVotes'

interface MyRouterContext {
  queryClient: QueryClient
}

const RootComponent = () => {
  useRealtimeVotes()

  return (
    <>
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})
