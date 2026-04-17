import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

export function getDatabaseUrl(): string | undefined {
	return Bun.env.DATABASE_URL
}

export function createPostgresClient(databaseUrl: string) {
	return postgres(databaseUrl, {
		max: 1,
	})
}

export function createDatabase(databaseUrl: string) {
	const client = createPostgresClient(databaseUrl)

	return {
		client,
		db: drizzle(client, { schema }),
	}
}
