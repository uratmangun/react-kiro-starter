import { Button } from '@/components/ui/button'
import { PageSkeleton } from '@/components/common/PageSkeleton'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(false)

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  if (isLoading) {
    return <PageSkeleton />
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">About</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          This is a modern full-stack web application built with cutting-edge technologies
          to provide the best developer experience and user experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h3 className="text-lg font-semibold mb-3">Frontend Stack</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Vite - Fast build tool
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              React 18+ - Modern UI library
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              TypeScript - Type safety
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Tailwind CSS - Utility-first CSS
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              shadcn/ui - Component library
            </li>
          </ul>
        </div>
        
        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h3 className="text-lg font-semibold mb-3">Backend & Tools</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              Supabase - Backend as a Service
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              PostgreSQL - Database
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              Real-time subscriptions
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              ESLint & Prettier - Code quality
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              Vitest - Testing framework
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
        <h3 className="text-lg font-semibold mb-3">UI Components Demo</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to see skeleton loading states in action.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={simulateLoading} variant="outline">
            Show Loading Skeleton
          </Button>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}