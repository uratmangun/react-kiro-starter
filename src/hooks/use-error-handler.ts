import { useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { 
  handleSupabaseError, 
  logError, 
  withRetry, 
  type RetryConfig 
} from '@/lib/supabase-errors'

interface UseErrorHandlerOptions {
  showToast?: boolean
  logError?: boolean
  retryConfig?: Partial<RetryConfig>
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { toast } = useToast()
  const { 
    showToast = true, 
    logError: shouldLog = true,
    retryConfig 
  } = options

  const handleError = useCallback((error: any, context?: string) => {
    const appError = handleSupabaseError(error)
    
    // Log the error if enabled
    if (shouldLog) {
      logError(appError, context)
    }

    // Show toast notification if enabled
    if (showToast) {
      toast({
        variant: "destructive",
        title: "Error",
        description: appError.message,
      })
    }

    return appError
  }, [toast, shouldLog, showToast])

  const handleAsyncError = useCallback(async <T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await operation()
    } catch (error) {
      handleError(error, context)
      return null
    }
  }, [handleError])

  const handleAsyncErrorWithRetry = useCallback(async <T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await withRetry(operation, retryConfig)
    } catch (error) {
      handleError(error, context)
      return null
    }
  }, [handleError, retryConfig])

  const showErrorToast = useCallback((message: string, title?: string) => {
    toast({
      variant: "destructive",
      title: title || "Error",
      description: message,
    })
  }, [toast])

  const showSuccessToast = useCallback((message: string, title?: string) => {
    toast({
      title: title || "Success",
      description: message,
    })
  }, [toast])

  return {
    handleError,
    handleAsyncError,
    handleAsyncErrorWithRetry,
    showErrorToast,
    showSuccessToast
  }
}

export default useErrorHandler