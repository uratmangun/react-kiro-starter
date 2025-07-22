
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ErrorFallbackProps {
  error?: Error | null
  resetError?: () => void
  title?: string
  description?: string
  showHomeButton?: boolean
  showRetryButton?: boolean
}

export function ErrorFallback({
  error,
  resetError,
  title = "Something went wrong",
  description = "We're sorry, but something unexpected happened.",
  showHomeButton = true,
  showRetryButton = true
}: ErrorFallbackProps) {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        {import.meta.env.DEV && error && (
          <div className="text-left bg-muted p-3 rounded-md">
            <details className="text-sm">
              <summary className="cursor-pointer font-medium mb-2">
                Error Details (Development)
              </summary>
              <div className="text-xs font-mono">
                <div className="mb-2">
                  <strong>Message:</strong> {error.message}
                </div>
                {error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1 text-xs">
                      {error.stack.split('\n').slice(0, 5).join('\n')}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetryButton && resetError && (
            <Button onClick={resetError} variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          {showHomeButton && (
            <Button onClick={handleGoHome} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback