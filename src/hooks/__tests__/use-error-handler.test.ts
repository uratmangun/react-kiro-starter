import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useErrorHandler } from '../use-error-handler'

// Mock the toast hook
const mockToast = vi.fn()
vi.mock('../use-toast', () => ({
  useToast: () => ({ toast: mockToast })
}))

// Mock the error handling utilities
vi.mock('@/lib/supabase-errors', () => ({
  handleSupabaseError: vi.fn((error) => ({
    code: 'test_error',
    message: error.message || 'Test error message',
    timestamp: new Date()
  })),
  logError: vi.fn(),
  withRetry: vi.fn()
}))

describe('useErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('handles errors and shows toast by default', () => {
    const { result } = renderHook(() => useErrorHandler())
    
    const testError = new Error('Test error')
    
    act(() => {
      result.current.handleError(testError, 'test context')
    })

    expect(mockToast).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Error",
      description: "Test error",
    })
  })

  it('does not show toast when disabled', () => {
    const { result } = renderHook(() => useErrorHandler({ showToast: false }))
    
    const testError = new Error('Test error')
    
    act(() => {
      result.current.handleError(testError, 'test context')
    })

    expect(mockToast).not.toHaveBeenCalled()
  })

  it('shows success toast', () => {
    const { result } = renderHook(() => useErrorHandler())
    
    act(() => {
      result.current.showSuccessToast('Operation successful')
    })

    expect(mockToast).toHaveBeenCalledWith({
      title: "Success",
      description: "Operation successful",
    })
  })

  it('shows error toast with custom title', () => {
    const { result } = renderHook(() => useErrorHandler())
    
    act(() => {
      result.current.showErrorToast('Custom error message', 'Custom Title')
    })

    expect(mockToast).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Custom Title",
      description: "Custom error message",
    })
  })

  it('handles async errors and returns null on error', async () => {
    const { result } = renderHook(() => useErrorHandler())
    
    const failingOperation = vi.fn().mockRejectedValue(new Error('Async error'))
    
    const response = await act(async () => {
      return result.current.handleAsyncError(failingOperation, 'async context')
    })

    expect(response).toBeNull()
    expect(mockToast).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Error",
      description: "Async error",
    })
  })

  it('handles successful async operations', async () => {
    const { result } = renderHook(() => useErrorHandler())
    
    const successfulOperation = vi.fn().mockResolvedValue('success data')
    
    const response = await act(async () => {
      return result.current.handleAsyncError(successfulOperation, 'async context')
    })

    expect(response).toBe('success data')
    expect(mockToast).not.toHaveBeenCalled()
  })
})