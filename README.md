# Karno Frontend

A production-ready Next.js frontend for the Karno resume builder and admin panel. The app is built with modern React, TypeScript, Tailwind CSS, React Query, and a secure access-token-based authentication flow.

## Overview

This repository contains the client-side application for Karno. It is a fully RTL Persian UI with:

- User authentication and email/OTP verification
- Resume creation and preview with template switching
- Profile management and CV history
- Admin dashboards, user management, analytics, and notifications
- API proxying through Next.js route handlers and direct backend integration

## Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- React Query (`@tanstack/react-query`)
- Zod + React Hook Form
- Axios for API integration
- React Hot Toast for toast notifications
- Swiper, Chart.js, React Paginate, React To Print, date picker utilities
- Zustand for lightweight client state

## Key concepts

### Authentication

- Access tokens are stored in-memory only via `src/lib/auth.ts`
- Refresh tokens are expected to be stored in an `httpOnly` cookie by the backend
- `AuthProvider` periodically refreshes the access token and refreshes on focus/online
- Routes use auth checks via custom hooks like `useCheckAuth`

### API integration

- `src/lib/axios.ts`
  - `BaseAPI` communicates with the backend directly
  - `NextAPI` is used for internal Next.js API route handlers
  - Both clients attach the in-memory access token automatically
  - `BaseAPI` includes an auto-refresh interceptor for `/Refresh`

- `src/app/api/**/route.ts`
  - Acts as proxy/api-route passthroughs for frontend requests through Next.js
  - Keeps backend calls centralized and reusable

### State management

- `@tanstack/react-query` for server state, caching, and invalidation
- `zustand` for client-local state such as resume template selection
- `useApiMutation` and `useAPIQuery` custom hooks wrap API usage consistently

## Project structure

```text
src/
  app/
    layout.tsx
    page.tsx
    Auth/            # login, register, verify email, auth error
    Home/            # authenticated home/dashboard
    CV/              # resume builder, slider, preview
    profile/         # user profile and CV list
    Admin/           # admin dashboards and management
    api/             # Next.js route handlers and backend proxies
    providers/       # AuthProvider, QueryProvider
  components/
    auth/            # login/register forms, verification UI
    CV/              # resume form, template renderer
    admin-panel/     # dashboards, analytics, user/CV management
    modal/           # reusable modal components
    Profile/         # profile UI and user CV listing
  hooks/
    api-hooks/       # custom React Query hooks
    auth/            # auth helpers and session hooks
  lib/
    axios.ts         # axios clients and interceptors
    auth.ts          # token helpers and helpers for auth flow
    chart.ts         # chart.js setup
  Store/              # zustand state stores
  Types/              # zod schemas and type definitions
  utils/              # shared utilities and helpers
assets/
  style/              # Tailwind and custom global CSS
```

## Getting started

### Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open: `http://localhost:3000`

### Build

```bash
npm run build
```

### Production start

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Environment variables

The frontend expects the following environment variable when running outside of local development:

- `NEXT_PUBLIC_API_URL` — base URL for the backend API

> Note: `src/lib/axios.ts` currently uses a local network IP fallback when `window.location.hostname` is not `localhost`. This is useful for devices or emulated mobile environments.

## Routes and UX flow

- `/` redirects users to `/Home` when authenticated or `/Auth/login` when unauthenticated
- `/Auth/login` and `/Auth/register` handle authentication with form validation
- `/Auth/VerifyEmail` handles email verification
- `/CV` is the main resume editor with live template preview
- `/profile` shows user profile and saved CVs
- `/Admin` contains dashboard and user/CV management tools

## Important implementation notes

- `RootLayout` wraps the app with `AuthProvider`, `QueryProvider`, and `DeleteModalProvider`
- The UI is RTL and layout direction is configured in `src/app/layout.tsx`
- Global styles are imported from `assets/style/globals.css`, `Fontface.css`, and `Theme.css`
- `useAPIQuery` and `useApiMutation` are the recommended patterns for new backend calls
- Use `@` path aliases to import from `src/` cleanly

## Contributing guidelines

- Keep API route proxies in `src/app/api/` and use `NextAPI` for frontend route consumption
- Keep form validation in Zod schemas under `src/Types`
- Prefer composable hooks for auth and query behavior
- Maintain the RTL experience and Persian localization for shared components
- Reuse the existing modal and admin components where possible

## Troubleshooting

- If auth redirects fail, verify that the backend refresh endpoint `/Refresh` is reachable
- If `NEXT_PUBLIC_API_URL` is not defined, local development may still work on `localhost`, but deployed environments require the variable
- If you add a new route alias, update `tsconfig.json` paths accordingly

## Summary

This frontend is designed as a scalable, authenticated Next.js application with a strong separation between UI, state management, and backend integration. Focus new work around reusable hooks, consistent API clients, and secure access token handling.
