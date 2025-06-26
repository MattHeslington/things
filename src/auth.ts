import * as schema from '$lib/server/db/schema'
import { env } from '$env/dynamic/private'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { DrizzleClient } from '$lib/server/db'

export const createAuth = function (database: DrizzleClient) {
	return betterAuth({
		trustedOrigins: env.TRUSTED_ORIGINS?.split(',') ?? [],
		database: drizzleAdapter(database, {
			schema,
			provider: 'sqlite'
		}),
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID as string,
				clientSecret: env.GOOGLE_CLIENT_SECRET as string
			}
		}
	})
}

export type BetterAuth = ReturnType<typeof createAuth>
