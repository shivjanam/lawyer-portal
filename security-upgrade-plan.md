# Security Upgrade Plan - lawyer-portal for Vercel Deployment

## Objective
Prepare the lawyer-portal monorepo for secure internet-facing deployment on Vercel, addressing critical security advisories and configuring the architecture to work with a hosted API/database endpoint.

## Architecture for Vercel
- **Frontend**: Next.js 15.5+ (Vercel-hosted)
- **Backend API**: FastAPI (hosted on a platform Vercel can reach, e.g., Railway/Render/Vercel Serverless)
- **Database**: PostgreSQL (hosted, e.g., Vercel Postgres/Neon/Neon.tech/Railway)
- **Redis**: Redis Cloud or Upstash (Vercel-compatible)

## Changes Required

### 1. Next.js Version Upgrade (apps/web)
- Upgrade `next` from 14.2.35 → 15.5.24 (patched version)
- Upgrade `react`/`react-dom` from 18.3.1 → 19.3.0
- Update all TypeScript/ESM configs

### 2. Environment Configuration
- Add `.env.example` with all required Vercel variables
- Remove hardcoded secrets from existing `.env`
- Add `API_INTERNAL_URL` configuration for the hosted backend

### 3. Next.js API Routes Configuration
- Configure `API_INTERNAL_URL` environment variable with `??` fallback for local dev
- Ensure all routes use the hosted backend URL in production

### 4. Security Hardening
- Enable CORS restrictions (allow only Vercel domain)
- Add security headers via middleware
- Add rate limiting strategy
- Secure cookie configuration

### 5. Vercel Configuration
- Add `vercel.json` with proper settings
- Configure build/prod commands
- Set environment variables (server-side only)

### 6. Docker/Unused Files
- Mark local dev Docker files as dev-only
- Document that Docker is for local development only

## Files to Create
1. `advocate-pro/apps/web/vercel.json`
2. `advocate-pro/apps/web/.env.example`
3. `vercel.json` (repository root)
4. Updated `README.md` with Vercel deployment instructions

## Files to Modify
1. `advocate-pro/apps/web/package.json` - Next.js version bump
2. `advocate-pro/apps/web/next.config.mjs` - add env config
3. `advocate-pro/apps/web/app/api/backend/[...path]/route.ts` - production config
4. `advocate-pro/apps/web/app/api/auth/login/route.ts` - production config
5. `advocate-pro/apps/web/app/api/auth/signup/route.ts` - production config
6. `advocate-pro/apps/web/lib/api.ts` - ensure correct base URL
7. `advocate-pro/apps/web/components` (update as needed)
8. `advocate-pro/.env.example` - add API_INTERNAL_URL

## Files to Delete/Archive (optional)
- Remove local Docker Compose configs from production build
- Archive `advocate-pro/apps/api/Dockerfile` and `advocate-pro/Dockerfile` for local dev
