# React Kiro Starter

A modern, production-ready React starter template built with Vite, TypeScript, Supabase, and shadcn/ui. This template provides a solid foundation for building scalable web applications with modern tooling and best practices.

## ✨ Features

- ⚡ **Vite** - Fast build tool with HMR and optimized production builds
- ⚛️ **React 19** - Latest React with modern features
- 🔷 **TypeScript** - Full type safety and IntelliSense support
- 🗄️ **Supabase** - Backend-as-a-Service with database and authentication
- 🎨 **shadcn/ui** - Beautiful, accessible UI components
- 🎯 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 📏 **ESLint & Prettier** - Code quality and formatting
- 🔄 **React Router** - Client-side routing
- 📱 **Responsive Design** - Mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- A Supabase project (create one at [supabase.com](https://supabase.com))
- GitHub CLI (optional, for template usage)

### Creating a New Project from Template

#### Option 1: Using GitHub CLI (Recommended)

```bash
# Create a new repository from this template
gh repo create my-awesome-project --template uratmangun/react-kiro-starter --public

# Clone your new repository
gh repo clone my-awesome-project
cd my-awesome-project
```

#### Option 2: Using GitHub Web Interface

1. Go to [github.com/uratmangun/react-kiro-starter](https://github.com/uratmangun/react-kiro-starter)
2. Click the green **"Use this template"** button
3. Choose **"Create a new repository"**
4. Fill in your repository details and click **"Create repository"**
5. Clone your new repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

#### Option 3: Manual Clone (Development)

```bash
# For contributing to this template or development purposes
git clone https://github.com/uratmangun/react-kiro-starter.git
cd react-kiro-starter
```

### Installation

1. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components
│   ├── layout/         # Layout components
│   ├── providers/      # Context providers
│   └── ui/            # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/               # Utility libraries
│   ├── supabase.ts    # Supabase client configuration
│   └── supabase-errors.ts # Error handling utilities
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── test/              # Test utilities
└── assets/            # Static assets
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun preview` | Preview production build |
| `bun test` | Run tests in watch mode |
| `bun test:run` | Run tests once |
| `bun test:ui` | Run tests with UI |
| `bun test:coverage` | Run tests with coverage |
| `bun lint` | Lint code |
| `bun lint:fix` | Fix linting issues |
| `bun format` | Format code with Prettier |
| `bun format:check` | Check code formatting |
| `bun type-check` | Check TypeScript types |
| `bun check-all` | Run all checks (type, lint, format, test) |

## 🗄️ Supabase Configuration

### Environment Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to find your project URL and anon key
3. Update your `.env` file with these credentials

### Database Schema

The project includes TypeScript types for your database schema in `src/types/database.ts`. Update this file to match your Supabase database structure.

### Authentication

The Supabase client is configured with:
- Auto token refresh
- Session persistence
- URL session detection

### Error Handling

The project includes comprehensive error handling utilities in `src/lib/supabase-errors.ts` with:
- Retry mechanisms
- Error logging
- User-friendly error messages

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of:
- **Radix UI** - Unstyled, accessible components
- **Tailwind CSS** - Utility-first styling
- **Class Variance Authority** - Component variants
- **Lucide React** - Beautiful icons

### Adding New Components

```bash
bunx shadcn@latest add button
# or
npx shadcn@latest add button
```

## 🧪 Testing

The project is configured with:
- **Vitest** - Fast test runner
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests
- **@testing-library/jest-dom** - Custom matchers

### Running Tests

```bash
# Run tests in watch mode
bun test

# Run tests once
bun test:run

# Run tests with coverage
bun test:coverage

# Run tests with UI
bun test:ui
```

## 📦 Technologies Used

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Supabase
- **Routing**: React Router DOM
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier
- **Package Manager**: Bun (recommended) or npm

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run the checks: `bun check-all`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue if needed
3. Refer to the [Supabase Documentation](https://supabase.com/docs)
4. Check the [shadcn/ui Documentation](https://ui.shadcn.com/)

---

**Happy coding! 🚀**
