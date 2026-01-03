import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

let queryClientInstance: QueryClient | null = null

const getQueryClient = () => {
  if (!queryClientInstance) {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          refetchOnWindowFocus: false,
        },
      },
    })
  }
  return queryClientInstance
}

export const getContext = () => {
  const queryClient = getQueryClient()
  return {
    queryClient,
  }
}

export const Provider = ({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
