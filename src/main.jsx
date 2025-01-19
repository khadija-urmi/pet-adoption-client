import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {
  QueryClient, QueryClientProvider
} from '@tanstack/react-query'
import { router } from './routes/Routes'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './provider/AuthProvider'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <Toaster position='top-right' reverseOrder={false} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
