import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import { handleSupabaseError, logError, withRetry } from './supabase-errors'

const supabaseUrl = import.meta.env['VITE_SUPABASE_URL']
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY']

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

/**
 * Enhanced Supabase client with built-in error handling and retry logic
 */
export class SupabaseClient {
  private client = supabase

  /**
   * Execute a Supabase query with error handling
   */
  async executeQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>,
    context?: string
  ): Promise<T | null> {
    try {
      const { data, error } = await queryFn()
      
      if (error) {
        const appError = handleSupabaseError(error, context)
        logError(appError, context)
        throw error
      }
      
      return data
    } catch (error) {
      const appError = handleSupabaseError(error, context)
      logError(appError, context)
      throw error
    }
  }

  /**
   * Execute a Supabase query with retry logic
   */
  async executeQueryWithRetry<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>,
    context?: string
  ): Promise<T | null> {
    return withRetry(async () => {
      const { data, error } = await queryFn()
      
      if (error) {
        const appError = handleSupabaseError(error, context)
        logError(appError, context)
        throw error
      }
      
      return data
    })
  }

  /**
   * Get the underlying Supabase client
   */
  get raw() {
    return this.client
  }
}

export const enhancedSupabase = new SupabaseClient()