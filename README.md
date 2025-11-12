# Dejankify My Site

A website performance analysis tool that helps identify and fix performance issues, SEO problems, and accessibility concerns. "Dejankify" means removing performance bottlenecks and improving the smoothness of web experiences.

> **Note**: This project currently uses mock data. Real website analysis functionality is planned for future development.

## Project Overview

This is a monorepo containing a website performance analysis tool ("Dejankify") built with:
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS 4
- **Backend**: Node.js + Express
- **Package Manager**: npm workspaces

The frontend displays website analysis results with scores for performance, SEO, accessibility, and best practices.

## Workspace Structure

The project uses npm workspaces with apps located in `apps/`:
- `apps/frontend/` - React TypeScript application
- `apps/backend/` - Express API server

## Project Structure

```
dejankify-my-site/
├── package.json                 # Root workspace configuration
├── apps/
│   ├── frontend/               # React app (Vite + TypeScript)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── backend/                # Express API
│       ├── src/
│       │   └── index.js
│       └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm 8+

## Getting Started

### Installation

Install all dependencies for both frontend and backend:

```bash
npm install
```

This will install dependencies for the root workspace and all packages.

### Development

#### Run frontend and backend (requires two terminals)

```bash
# Terminal 1: Start backend
npm run dev:backend

# Terminal 2: Start frontend
npm run dev:frontend
```

#### Or run them individually

**Backend only:**
```bash
npm run dev:backend
```
The backend will run on http://localhost:3001

**Frontend only:**
```bash
npm run dev:frontend
```
The frontend will run on http://localhost:3000

### API Endpoints

The backend provides the following endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/data` - Returns sample data
- `POST /api/echo` - Echo endpoint that returns the request body

### How it Works

- The frontend is configured with a Vite proxy to forward `/api/*` requests to the backend
- The backend uses CORS to allow cross-origin requests
- Both apps are managed as npm workspaces in a monorepo structure

### Production Build

Build both apps:
```bash
npm run build
```

Build individually:
```bash
npm run build:frontend
npm run build:backend
```

### Available Scripts

From the root directory:

- `npm run dev:frontend` - Start frontend dev server
- `npm run dev:backend` - Start backend dev server
- `npm run build:frontend` - Build frontend for production
- `npm run build:backend` - Build backend for production
- `npm run start:backend` - Start backend in production mode

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

## Troubleshooting

### Port Already in Use

If you see an error like `EADDRINUSE: address already in use :::3000` or `:::3001`:

**Solution:**
```bash
# Find and kill the process using the port (Mac/Linux)
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or change the port in the configuration:

- Frontend: Edit `vite.config.ts` and change `server.port`
- Backend: Set environment variable `PORT=3002` before running

### Module Not Found Errors

If you see module import errors after pulling new changes:

**Solution:**

```bash
# Clean install all dependencies
rm -rf node_modules package-lock.json
rm -rf apps/*/node_modules apps/*/package-lock.json
npm install
```

### TypeScript Errors After Updating

If TypeScript shows errors after updating dependencies:

**Solution:**

```bash
# Rebuild TypeScript
npm run build:frontend
```

Check that all three TypeScript config files (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`) are present in `apps/frontend/`.

### CORS Errors

If you see CORS errors in the browser console when calling the API:

**Check:**

1. Backend is running on port 3001
2. Frontend proxy is configured correctly in `vite.config.ts`
3. Both servers are running simultaneously

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
