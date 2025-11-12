# Monorepo Project

A monorepo setup with React frontend and Node/Express backend using npm workspaces.

## Project Structure

```
monorepo-project/
├── package.json                 # Root workspace configuration
├── packages/
│   ├── frontend/               # React app (Vite)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.js
│   └── backend/                # Express API
│       ├── src/
│       │   └── index.js
│       └── package.json
└── README.md
```

## Getting Started

### Installation

Install all dependencies for both frontend and backend:

```bash
npm install
```

This will install dependencies for the root workspace and all packages.

### Development

#### Run both frontend and backend concurrently:

```bash
# Start backend (in one terminal)
npm run dev:backend

# Start frontend (in another terminal)
npm run dev:frontend
```

#### Or run them separately:

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

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Package Manager:** npm with workspaces
