import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useErrorHandler } from '@/hooks/use-error-handler'
import AsyncErrorBoundary from '@/components/common/AsyncErrorBoundary'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export default function HomePage() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { handleAsyncError, showSuccessToast, showErrorToast } = useErrorHandler()

  const handleCountClick = () => {
    setCount(count => count + 1)
    toast({
      title: "Counter Updated!",
      description: `Count is now ${count + 1}`,
    })
  }

  const simulateAsyncError = async () => {
    setIsLoading(true)
    
    const result = await handleAsyncError(async () => {
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate an error
      throw new Error('Simulated async operation failed')
    }, 'HomePage.simulateAsyncError')
    
    setIsLoading(false)
    
    if (result) {
      showSuccessToast('Operation completed successfully!')
    }
  }

  const simulateSupabaseError = async () => {
    setIsLoading(true)
    
    const result = await handleAsyncError(async () => {
      // This will fail because we don't have a 'test_table' table
      const { data, error } = await supabase
        .from('profiles' as any)
        .select('*')
        .limit(1)
      
      if (error) throw error
      return data
    }, 'HomePage.simulateSupabaseError')
    
    setIsLoading(false)
    
    if (result) {
      showSuccessToast('Supabase query completed successfully!')
    }
  }

  const simulateNetworkError = async () => {
    setIsLoading(true)
    
    const result = await handleAsyncError(async () => {
      // Simulate a network request that fails
      const response = await fetch('https://nonexistent-api.example.com/data')
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`)
      }
      return response.json()
    }, 'HomePage.simulateNetworkError')
    
    setIsLoading(false)
    
    if (result) {
      showSuccessToast('Network request completed successfully!')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center gap-4 sm:gap-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            className="h-16 w-16 sm:h-24 sm:w-24 hover:drop-shadow-lg transition-all"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="h-16 w-16 sm:h-24 sm:w-24 hover:drop-shadow-lg transition-all animate-spin"
            alt="React logo"
          />
        </a>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Vite + React + Tailwind + shadcn/ui
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          A modern full-stack web application with responsive design, theme support, 
          and toast notifications.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleCountClick} size="lg">
          count is {count}
        </Button>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button onClick={() => showSuccessToast('This is a success message!')} variant="outline" size="sm">
            Show Success Toast
          </Button>
          <Button onClick={() => showErrorToast('This is an error message!')} variant="outline" size="sm">
            Show Error Toast
          </Button>
        </div>

        <AsyncErrorBoundary>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Error Handling Demo</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                onClick={simulateAsyncError} 
                variant="destructive" 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Simulate Async Error'}
              </Button>
              <Button 
                onClick={simulateSupabaseError} 
                variant="destructive" 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Simulate DB Error'}
              </Button>
              <Button 
                onClick={simulateNetworkError} 
                variant="destructive" 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Simulate Network Error'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-md mx-auto">
              These buttons demonstrate error handling with toast notifications and logging
            </p>
          </div>
        </AsyncErrorBoundary>

        <p className="text-muted-foreground text-center text-xs sm:text-sm max-w-md">
          Edit{' '}
          <code className="bg-muted px-2 py-1 rounded text-xs">
            src/pages/HomePage.tsx
          </code>{' '}
          and save to test HMR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-lg font-semibold mb-3">
            ✅ Layout & UI Complete!
          </h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Responsive AppLayout with header</li>
            <li>• Theme provider (light/dark/system)</li>
            <li>• Toast notification system</li>
            <li>• Loading spinners & skeleton components</li>
            <li>• Mobile-responsive navigation</li>
          </ul>
        </div>

        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-lg font-semibold mb-3">
            🎨 Design Features
          </h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Tailwind CSS utility classes</li>
            <li>• shadcn/ui component library</li>
            <li>• Consistent design system</li>
            <li>• Accessible components (WCAG)</li>
            <li>• Smooth animations & transitions</li>
          </ul>
        </div>

        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-lg font-semibold mb-3">
            🛡️ Error Handling
          </h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Global & route error boundaries</li>
            <li>• Supabase error handling utilities</li>
            <li>• Retry mechanisms with backoff</li>
            <li>• User-friendly error messages</li>
            <li>• Comprehensive error logging</li>
          </ul>
        </div>
      </div>
    </div>
  )
}