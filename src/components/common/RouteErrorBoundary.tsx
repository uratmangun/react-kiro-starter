import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorFallback from './ErrorFallback'
import { logError } from '@/lib/supabase-errors'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  title?: string
  description?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    logError({
      code: 'route_error_boundary',
      message: error.message,
      details: {
        stack: error.stack,
        componentStack: errorInfo.componentStack
      },
      timestamp: new Date()
    }, 'RouteErrorBoundary')
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null
    })
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorFallback
          error={this.state.error}
          resetError={this.handleReset}
          title={this.props.title}
          description={this.props.description}
        />
      )
    }

    return this.props.children
  }
}

export default RouteErrorBoundary