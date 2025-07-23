import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { ExternalLink, Github } from 'lucide-react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export default function HomePage() {
  const githubCommand = 'gh repo create my-awesome-project --template uratmangun/react-kiro-starter --public'

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center gap-4 sm:gap-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            className="h-16 w-16 sm:h-24 sm:w-24 hover:drop-shadow-lg transition-all"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="h-16 w-16 sm:h-24 sm:w-24 hover:drop-shadow-lg transition-all animate-spin"
            alt="React logo"
          />
        </a>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Vite + React + Tailwind + shadcn/ui
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          A modern full-stack web application with responsive design, theme support, 
          and toast notifications.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            <Github className="h-5 w-5" />
            Use This Template
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Get started quickly by creating a new repository from this template using GitHub CLI
          </p>
        </div>

        <div className="w-full max-w-2xl space-y-3">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
            <code className="flex-1 text-left">{githubCommand}</code>
            <CopyButton text={githubCommand} />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open('https://github.com/uratmangun/react-kiro-starter', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open('https://github.com/uratmangun/react-kiro-starter/generate', '_blank')}
            >
              <Github className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground text-center text-xs sm:text-sm max-w-md">
          Edit{' '}
          <code className="bg-muted px-2 py-1 rounded text-xs">
            src/pages/HomePage.tsx
          </code>{' '}
          and save to test HMR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-lg font-semibold mb-3">
            ✅ Layout & UI Complete!
          </h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Responsive AppLayout with header</li>
            <li>• Theme provider (light/dark/system)</li>
            <li>• Toast notification system</li>
            <li>• Loading spinners & skeleton components</li>
            <li>• Mobile-responsive navigation</li>
          </ul>
        </div>

        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-lg font-semibold mb-3">
            🎨 Design Features
          </h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Tailwind CSS utility classes</li>
            <li>• shadcn/ui component library</li>
            <li>• Consistent design system</li>
            <li>• Accessible components (WCAG)</li>
            <li>• Smooth animations & transitions</li>
          </ul>
        </div>

        <div className="p-4 sm:p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-lg font-semibold mb-3">
            🛡️ Error Handling
          </h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Global & route error boundaries</li>
            <li>• Supabase error handling utilities</li>
            <li>• Retry mechanisms with backoff</li>
            <li>• User-friendly error messages</li>
            <li>• Comprehensive error logging</li>
          </ul>
        </div>
      </div>
    </div>
  )
}