import { env } from '$env/dynamic/private'
import { createAuth } from './auth'
import { svelteKitHandler } from 'better-auth/svelte-kit'
import { createD1Client, createLibSqlClient } from '$lib/server/db'
import type { Handle } from '@sveltejs/kit'

const db = env.DATABASE_URL ? createLibSqlClient(env.DATABASE_URL) : null

export const handle: Handle = async ({ event, resolve }) => {
	// In development, prefer LibSQL over D1 simulation
    if (db && event.url.hostname === 'localhost') {
        console.log('🟢 Using LibSQL database (dev mode):', env.DATABASE_URL)
        event.locals.db = db
    } else if (event.platform?.env.DB) {
        console.log('🔴 Using D1 database binding (production/preview)')
        event.locals.db = createD1Client(event.platform.env.DB)
    } else if (db) {
        console.log('🟢 Using LibSQL database fallback:', env.DATABASE_URL)
        event.locals.db = db
    } else {
        throw new Error('No database found')
    }
	const auth = createAuth(event.locals.db)
	event.locals.auth = auth

	return svelteKitHandler({ event, resolve, auth })
}
