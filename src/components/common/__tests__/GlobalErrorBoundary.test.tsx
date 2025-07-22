import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import GlobalErrorBoundary from '../GlobalErrorBoundary'

// Mock the logError function
vi.mock('@/lib/supabase-errors', () => ({
  logError: vi.fn()
}))

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('GlobalErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Suppress console.error for cleaner test output
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <GlobalErrorBoundary>
        <ThrowError shouldThrow={false} />
      </GlobalErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    render(
      <GlobalErrorBoundary>
        <ThrowError shouldThrow={true} />
      </GlobalErrorBoundary>
    )

    expect(screen.getAllByText('Something went wrong')[0]).toBeInTheDocument()
    expect(screen.getByText("We're sorry, but something unexpected happened. Please try again.")).toBeInTheDocument()
  })

  it('shows retry and reload buttons', () => {
    render(
      <GlobalErrorBoundary>
        <ThrowError shouldThrow={true} />
      </GlobalErrorBoundary>
    )

    expect(screen.getAllByText('Try Again')[0]).toBeInTheDocument()
    expect(screen.getByText('Reload Page')).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <GlobalErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </GlobalErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('shows retry button that can be clicked', () => {
    render(
      <GlobalErrorBoundary>
        <ThrowError shouldThrow={true} />
      </GlobalErrorBoundary>
    )

    const retryButtons = screen.getAllByText('Try Again')
    expect(retryButtons[0]).toBeInTheDocument()
    
    // Test that the button is clickable
    fireEvent.click(retryButtons[0])
    
    // The error boundary should still show the error state after clicking
    expect(screen.getAllByText('Something went wrong')[0]).toBeInTheDocument()
  })
})