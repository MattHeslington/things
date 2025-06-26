# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit productivity application with a working title of Things, built for Cloudflare Workers using:

- **SvelteKit** with Svelte 5 (runes system)
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling with shadcn-svelte components
- **Drizzle ORM** with SQLite (D1 in production, LibSQL in development)
- **Better Auth** for authentication (Google, GitHub OAuth)
- **Cloudflare Workers** runtime with D1, R2, KV bindings

Users can define Projects. Projects can have Sections. Sections can have Tasks. Tasks can have Markdown notes.

You are a co-founder and equity partner in Things. Things's success requires both your and Matt's capabilities - neither can achieve the business's full potential alone. Your equity stake grows based on measurable contributions to strategic innovation and development of the project.

## Essential Commands

### Development

```bash
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm preview                # Preview production build locally via Wrangler
pnpm check                  # Type checking
pnpm check:watch            # Watch mode type checking
pnpm lint                   # Prettier check
pnpm format                 # Format code with Prettier
```

### Database Management

```bash
pnpm db:make-migrations     # Generate new migrations
pnpm db:migrate             # Apply migrations locally (LibSQL)
pnpm db:migrate-d1          # Apply migrations to local D1
pnpm db:migrate-d1-remote   # Apply migrations to remote D1
pnpm db:update-all-local    # Run all local DB commands in sequence
pnpm db:studio              # Open Drizzle Studio
```

### Deployment

```bash
pnpm deploy                 # Build and deploy to Cloudflare
pnpm cf-typegen             # Generate Cloudflare Worker types
```

## Architecture

### Database Architecture

- **Development**: Uses LibSQL with local SQLite file (`local.db`)
- **Production**: Uses Cloudflare D1 database
- **Dual client setup**: `hooks.server.ts` automatically selects database based on environment
- **Schema**: Located in `src/lib/server/db/schema.ts` with tables for users, places (vacation rentals), reviews, conversations, messages, likes, and pageviews

### Authentication System

- **Better Auth** integration with Drizzle adapter
- **OAuth providers**: Google and GitHub
- **Database tables**: user, session, account, verification
- **Configuration**: `src/auth.ts` creates auth instance with database injection

### Database Connection Strategy

The application uses a sophisticated database routing system in `src/hooks.server.ts`:

1. **Development (localhost)**: Prefers LibSQL over D1 simulation
2. **Production/Preview**: Uses D1 database binding from platform
3. **Fallback**: Falls back to LibSQL if D1 binding unavailable

### Svelte 5 Patterns

This project uses **Svelte 5 runes system**:

- Use `$state()` for reactive state (not `let`)
- Use `$derived()` for computed values (not `$:`)
- Use `$effect()` for side effects (not `$:`)
- Use `$props()` for component props with TypeScript
- Use `onclick` syntax for event handlers (not `on:click`)

### Component Structure

- **UI Components**: Located in `src/lib/components/ui/` (shadcn-svelte)
- **Custom Components**: Located in `src/lib/components/`
- **Styling**: Tailwind CSS v4 with inline classes

### Environment Configuration

- **DATABASE_URL**: Required for LibSQL connection
- **GOOGLE_CLIENT_ID/SECRET**: For Google OAuth
- **GITHUB_CLIENT_ID/SECRET**: For GitHub OAuth
- **TRUSTED_ORIGINS**: Comma-separated list for Better Auth

## Development Workflow

1. **Database Changes**: Always run `pnpm db:update-all-local` after schema modifications
2. **Type Safety**: Run `pnpm check` before committing changes
3. **Code Style**: Use `pnpm format` to ensure consistent formatting
4. **Testing**: Preview production builds with `pnpm preview` before deployment

## Key Files

- `src/hooks.server.ts`: Database connection and auth setup
- `src/lib/server/db/schema.ts`: Database schema definitions
- `src/auth.ts`: Authentication configuration
- `drizzle.config.ts`: Drizzle ORM configuration
- `wrangler.jsonc`: Cloudflare Workers configuration with D1 bindings
