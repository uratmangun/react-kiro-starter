
import { Skeleton } from '@/components/ui/skeleton'

interface PageSkeletonProps {
  showHeader?: boolean
  showSidebar?: boolean
  lines?: number
}

export function PageSkeleton({ 
  showHeader = true, 
  showSidebar = false, 
  lines = 5 
}: PageSkeletonProps) {
  return (
    <div className="space-y-6 p-6">
      {showHeader && (
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}
      
      <div className={`${showSidebar ? 'grid grid-cols-1 md:grid-cols-4 gap-6' : ''}`}>
        {showSidebar && (
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
        
        <div className={`space-y-4 ${showSidebar ? 'md:col-span-3' : ''}`}>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              {i % 2 === 0 && <Skeleton className="h-4 w-3/5" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PageSkeleton