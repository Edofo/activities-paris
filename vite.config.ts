import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Keep types together - don't split type files
          if (id.includes('/types/') || id.includes('\\types\\')) {
            return 'types'
          }

          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // TanStack libraries
            if (
              id.includes('@tanstack/react-router') ||
              id.includes('@tanstack/router')
            ) {
              return 'tanstack-router'
            }
            if (
              id.includes('@tanstack/react-query') ||
              id.includes('@tanstack/query')
            ) {
              return 'tanstack-query'
            }
            if (id.includes('@tanstack/react-devtools')) {
              return 'tanstack-devtools'
            }

            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase'
            }

            // UI libraries
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
            if (id.includes('lucide-react')) {
              return 'lucide-icons'
            }

            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
