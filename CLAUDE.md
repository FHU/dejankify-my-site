# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing a website performance analysis tool ("Dejankify") built with:
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS 4
- **Backend**: Node.js + Express
- **Package Manager**: npm workspaces

The frontend displays website analysis results with scores for performance, SEO, accessibility, and best practices. Currently uses mock/sample data.

## Workspace Structure

The project uses npm workspaces with apps located in `apps/`:
- `apps/frontend/` - React TypeScript application
- `apps/backend/` - Express API server

## Development Commands

### Installation
```bash
npm install  # Installs dependencies for all workspaces
```

### Running Dev Servers
```bash
# Backend (runs on http://localhost:3001)
npm run dev:backend

# Frontend (runs on http://localhost:3000)
npm run dev:frontend

# Both concurrently
npm run dev
```

### Building
```bash
# Frontend TypeScript check + Vite build
npm run build:frontend

# Backend (no build step, just echoes message)
npm run build:backend

# Both
npm run build
```

### Linting
```bash
# Frontend only
npm run lint -w frontend
```

### Production
```bash
npm run start:backend  # Runs backend in production mode
```

## Architecture

### Frontend Architecture

The React app uses a **sidebar + main content layout**:

- **State Management**: Local React state in App.tsx (no external state library)
- **Data Flow**: Sample data defined in App.tsx and MainContent.tsx components
- **Types**: Centralized in `apps/frontend/src/types.ts`
  - `Analysis` - Website analysis with scores and metadata
  - `Scores` - Performance, SEO, accessibility, overall scores
  - `Issue` - Individual issue with severity, title, description, recommendation
  - `IssuesCollection` - Categorized issues (performance, seo, accessibility, bestPractices)
  - `Metric` - Performance metrics (FCP, LCP, TBT, CLS)

**Component Structure**:
- `App.tsx` - Root component managing analysis selection and URL input
- `Sidebar.tsx` - Analysis history and URL input form
- `MainContent.tsx` - Analysis results display (scores, metrics, issues)
- `ScoreCircle.tsx` - Circular score visualization
- `MetricCard.tsx` - Performance metric display card
- `Section.tsx` - Collapsible section for issue categories
- `IssueItem.tsx` - Individual issue display
- `HistoryItem.tsx` - Sidebar analysis history item

### Backend Architecture

Simple Express server with CORS enabled:
- `GET /api/health` - Health check
- `GET /api/data` - Returns sample data with items array
- `POST /api/echo` - Echo endpoint for testing

### Frontend-Backend Communication

The frontend uses Vite's proxy configuration to forward `/api/*` requests to `http://localhost:3001`. This is configured in `apps/frontend/vite.config.ts`:

```typescript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

The backend enables CORS to allow cross-origin requests.

## Key Implementation Notes

### TypeScript Configuration
The frontend uses three TypeScript configs:
- `tsconfig.json` - Main config with references to app and node configs
- `tsconfig.app.json` - Application code config
- `tsconfig.node.json` - Vite config file compilation

### Styling
Uses Tailwind CSS 4 with the Vite plugin (`@tailwindcss/vite`). No separate tailwind.config file needed for v4.

### Sample Data
Currently all analysis data is hardcoded:
- Analysis history in `App.tsx` (sampleAnalyses)
- Metrics in `MainContent.tsx` (sampleMetrics)
- Issues in `MainContent.tsx` (sampleIssues)

When implementing real analysis functionality, these will need to be replaced with API calls to the backend.

## Common Workflows

### Adding a New Component
1. Create component in `apps/frontend/src/components/`
2. Import and use TypeScript types from `types.ts`
3. Export component as default
4. Import in parent component

### Adding a New API Endpoint
1. Add route handler in `apps/backend/src/index.js`
2. Use existing CORS and JSON middleware
3. Return JSON responses

### Modifying Types
1. Update `apps/frontend/src/types.ts`
2. TypeScript will catch any breaking changes in components
3. Run `npm run build:frontend` to verify type checking
