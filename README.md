# Team 3 Frontend (k26Tiimi3FrontEnd)

Frontend for Team 3’s product catalog and reservation flow.  
Built with React, TypeScript, Vite, React Router, and Material UI.

## Features

- Browse product catalog
- View products by manufacturer
- Register and sign in
- Reserve products (authenticated users)
- View and cancel own reservations
- Manage profile (including account deletion)
- Light/dark theme toggle

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router 7
- Material UI (MUI)
- ESLint

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm
- Running backend API

### Installation

```bash
npm install
```

### Environment Configuration

The app reads Vite environment variables.

1. Start from `/home/runner/work/k26Tiimi3FrontEnd/k26Tiimi3FrontEnd/.env.example`
2. Create `/home/runner/work/k26Tiimi3FrontEnd/k26Tiimi3FrontEnd/.env.development` (local) or `/home/runner/work/k26Tiimi3FrontEnd/k26Tiimi3FrontEnd/.env.production` (production)
3. Configure:

```env
VITE_API_URL=http://localhost:8080
VITE_API_TIMEOUT=10000
VITE_API_DEBUG=false
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Type-check and build production bundle
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Project Structure

```text
src/
  api/           # API calls and auth fetch helpers
  components/    # Shared UI forms/components
  config/        # Environment-based API configuration
  context/       # User context and provider
  pages/         # Route-level pages
  theme/         # MUI theming and color mode
  types/         # Shared TypeScript types
```

## Deployment

Deployment instructions for Rahti/OpenShift are in:

- `/home/runner/work/k26Tiimi3FrontEnd/k26Tiimi3FrontEnd/DEPLOYMENT.md`

## Notes

- Authentication data is stored in `sessionStorage`.
- Backend endpoints are expected under `/api/*` (configured via `VITE_API_URL`).
