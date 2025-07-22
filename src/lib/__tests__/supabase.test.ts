import { describe, it, expect } from 'vitest'
import { handleAuthError, handleDatabaseError, handleSupabaseError, isAuthError, isDatabaseError } from '../supabase-errors'
import { AuthError, PostgrestError } from '@supabase/supabase-js'

describe('Supabase Error Handling', () => {
  describe('handleAuthError', () => {
    it('should handle invalid credentials error', () => {
      const authError = new AuthError('Invalid login credentials')
      const result = handleAuthError(authError)
      
      expect(result.type).toBe('auth')
      expect(result.authCode).toBe('invalid_credentials')
      expect(result.message).toBe('Invalid email or password. Please check your credentials and try again.')
    })

    it('should handle email not confirmed error', () => {
      const authError = new AuthError('Email not confirmed')
      const result = handleAuthError(authError)
      
      expect(result.authCode).toBe('email_not_confirmed')
      expect(result.message).toBe('Please check your email and click the confirmation link before signing in.')
    })

    it('should handle unknown auth errors', () => {
      const authError = new AuthError('Unknown error')
      const result = handleAuthError(authError)
      
      expect(result.type).toBe('auth')
      expect(result.message).toBe('Unknown error')
    })
  })

  describe('handleDatabaseError', () => {
    it('should handle not found error', () => {
      const dbError: PostgrestError = {
        name: 'PostgrestError',
        message: 'Not found',
        details: 'Resource not found',
        hint: '',
        code: 'PGRST116'
      }
      
      const result = handleDatabaseError(dbError, 'select')
      
      expect(result.type).toBe('database')
      expect(result.operation).toBe('select')
      expect(result.message).toBe('The requested resource was not found.')
    })

    it('should handle permission error', () => {
      const dbError: PostgrestError = {
        name: 'PostgrestError',
        message: 'Permission denied',
        details: 'Insufficient permissions',
        hint: '',
        code: 'PGRST301'
      }
      
      const result = handleDatabaseError(dbError, 'update')
      
      expect(result.message).toBe('You do not have permission to perform this action.')
    })
  })

  describe('utility functions', () => {
    it('should identify auth errors correctly', () => {
      const authError = new AuthError('Test error')
      const regularError = new Error('Regular error')
      
      expect(isAuthError(authError)).toBe(true)
      expect(isAuthError(regularError)).toBe(false)
    })

    it('should identify database errors correctly', () => {
      const dbError: PostgrestError = {
        name: 'PostgrestError',
        message: 'DB error',
        details: '',
        hint: '',
        code: 'PGRST116'
      }
      const regularError = new Error('Regular error')
      
      expect(isDatabaseError(dbError)).toBe(true)
      expect(isDatabaseError(regularError)).toBe(false)
    })

    it('should handle generic errors', () => {
      const genericError = new Error('Generic error')
      const result = handleSupabaseError(genericError)
      
      expect(result.code).toBe('unknown_error')
      expect(result.message).toBe('Generic error')
    })
  })
})