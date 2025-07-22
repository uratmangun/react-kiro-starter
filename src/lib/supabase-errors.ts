import { AuthError, PostgrestError } from '@supabase/supabase-js'

export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

export interface SupabaseAuthError extends AppError {
  type: 'auth'
  authCode: string
}

export interface SupabaseDatabaseError extends AppError {
  type: 'database'
  operation: 'select' | 'insert' | 'update' | 'delete'
}

/**
 * Handles Supabase authentication errors and converts them to user-friendly messages
 */
export function handleAuthError(error: AuthError): SupabaseAuthError {
  const baseError: SupabaseAuthError = {
    type: 'auth',
    code: error.message || 'unknown_auth_error',
    authCode: error.message || 'unknown',
    message: 'An authentication error occurred',
    timestamp: new Date()
  }

  switch (error.message) {
    case 'Invalid login credentials':
      return {
        ...baseError,
        authCode: 'invalid_credentials',
        message: 'Invalid email or password. Please check your credentials and try again.'
      }
    case 'Email not confirmed':
      return {
        ...baseError,
        authCode: 'email_not_confirmed',
        message: 'Please check your email and click the confirmation link before signing in.'
      }
    case 'User not found':
      return {
        ...baseError,
        authCode: 'user_not_found',
        message: 'No account found with this email address.'
      }
    case 'Password should be at least 6 characters':
      return {
        ...baseError,
        authCode: 'weak_password',
        message: 'Password must be at least 6 characters long.'
      }
    case 'User already registered':
      return {
        ...baseError,
        authCode: 'user_exists',
        message: 'An account with this email already exists.'
      }
    case 'Signup requires a valid password':
      return {
        ...baseError,
        authCode: 'invalid_password',
        message: 'Please provide a valid password.'
      }
    default:
      return {
        ...baseError,
        message: error.message || 'An unexpected authentication error occurred.'
      }
  }
}

/**
 * Handles Supabase database errors and converts them to user-friendly messages
 */
export function handleDatabaseError(
  error: PostgrestError,
  operation: 'select' | 'insert' | 'update' | 'delete' = 'select'
): SupabaseDatabaseError {
  const baseError: SupabaseDatabaseError = {
    type: 'database',
    operation,
    code: error.code || 'unknown_database_error',
    message: 'A database error occurred',
    details: error.details,
    timestamp: new Date()
  }

  switch (error.code) {
    case 'PGRST116':
      return {
        ...baseError,
        message: 'The requested resource was not found.'
      }
    case 'PGRST301':
      return {
        ...baseError,
        message: 'You do not have permission to perform this action.'
      }
    case '23505':
      return {
        ...baseError,
        message: 'This record already exists.'
      }
    case '23503':
      return {
        ...baseError,
        message: 'This action would violate data integrity constraints.'
      }
    case '42501':
      return {
        ...baseError,
        message: 'Insufficient permissions to access this resource.'
      }
    default:
      return {
        ...baseError,
        message: error.message || 'An unexpected database error occurred.'
      }
  }
}

/**
 * Generic error handler for Supabase operations
 */
export function handleSupabaseError(error: any, operation?: string): AppError {
  if (error?.name === 'AuthError') {
    return handleAuthError(error as AuthError)
  }
  
  if (error?.code && typeof error.code === 'string') {
    return handleDatabaseError(error as PostgrestError, operation as any)
  }

  // Fallback for unknown errors
  return {
    code: 'unknown_error',
    message: error?.message || 'An unexpected error occurred',
    details: error,
    timestamp: new Date()
  }
}

/**
 * Utility to check if an error is a Supabase auth error
 */
export function isAuthError(error: any): error is AuthError {
  return error?.name === 'AuthError'
}

/**
 * Utility to check if an error is a Supabase database error
 */
export function isDatabaseError(error: any): error is PostgrestError {
  return !!(error?.code && typeof error.code === 'string' && error?.message)
}

/**
 * Retry configuration for failed operations
 */
export interface RetryConfig {
  maxAttempts: number
  delayMs: number
  backoffMultiplier: number
  retryableErrors?: string[]
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
  retryableErrors: ['PGRST301', '42501', 'network_error', 'timeout']
}

/**
 * Determines if an error is retryable based on configuration
 */
export function isRetryableError(error: AppError, config: RetryConfig = DEFAULT_RETRY_CONFIG): boolean {
  if (!config.retryableErrors) return false
  
  return config.retryableErrors.includes(error.code) || 
         error.message.toLowerCase().includes('network') ||
         error.message.toLowerCase().includes('timeout') ||
         error.message.toLowerCase().includes('connection')
}

/**
 * Retry mechanism for async operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config }
  let lastError: Error
  
  for (let attempt = 1; attempt <= finalConfig.maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      // Convert to AppError if needed
      const appError = error instanceof Error 
        ? handleSupabaseError(error)
        : error as AppError
      
      // Don't retry if error is not retryable or this is the last attempt
      if (!isRetryableError(appError, finalConfig) || attempt === finalConfig.maxAttempts) {
        throw lastError
      }
      
      // Calculate delay with exponential backoff
      const delay = finalConfig.delayMs * Math.pow(finalConfig.backoffMultiplier, attempt - 1)
      
      // Log retry attempt
      logError({
        code: 'retry_attempt',
        message: `Retrying operation (attempt ${attempt}/${finalConfig.maxAttempts})`,
        details: { originalError: appError, delay },
        timestamp: new Date()
      }, 'withRetry')
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw lastError!
}

/**
 * Creates a retry wrapper for Supabase operations
 */
export function createRetryableOperation<T extends any[], R>(
  operation: (...args: T) => Promise<R>,
  config?: Partial<RetryConfig>
) {
  return async (...args: T): Promise<R> => {
    return withRetry(() => operation(...args), config)
  }
}

/**
 * Logs errors in development and sends to monitoring in production
 */
export function logError(error: AppError, context?: string) {
  const logData = {
    ...error,
    context,
    userAgent: navigator.userAgent,
    url: window.location.href
  }

  if (import.meta.env.DEV) {
    console.error('Supabase Error:', logData)
  } else {
    // In production, you might want to send to a monitoring service
    // Example: Sentry, LogRocket, etc.
    console.error('Error:', error.message)
  }
}