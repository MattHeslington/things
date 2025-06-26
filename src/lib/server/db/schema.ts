import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
// import { sql, type InferSelectModel } from 'drizzle-orm'

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull(),
	image: text('image'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	token: text('token').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
})

export const account = sqliteTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
	refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
	scope: text('scope'),
	password: text('password'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const verification = sqliteTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
})

export const projects = sqliteTable('projects', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	icon: text('icon') // Store emoji as a simple text field
})

export const sections = sqliteTable('sections', {
	id: integer('id').primaryKey(),
	projectId: integer('project_id')
		.notNull()
		.references(() => projects.id),
	name: text('name').notNull()
})

export const tasks = sqliteTable('tasks', {
	id: integer('id').primaryKey(),
	sectionId: integer('section_id')
		.notNull()
		.references(() => sections.id),
	title: text('title').notNull(),
	isCompleted: integer('is_completed').default(0) // Optional: Track task completion
})

export const markdownNotes = sqliteTable('markdown_notes', {
	id: integer('id').primaryKey(),
	taskId: integer('task_id')
		.notNull()
		.references(() => tasks.id),
	content: text('content').default('') // Store Markdown content
})

// export type GuestBookMessage = InferSelectModel<typeof guestbookMessages>
