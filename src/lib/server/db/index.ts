import { drizzle as drizzleLibSql, type LibSQLDatabase } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1, type DrizzleD1Database } from 'drizzle-orm/d1';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Update the PatchedD1Client to be more comprehensive
type PatchedSelectClient<T extends Record<string, any>> = {                                                                                                        
    select: <TFields extends Record<string, any>>(                                                                                                                 
        fields: TFields                                                                                                                                            
    ) => {                                                                                                                                                         
        from: <TTable extends T[keyof T]>(table: TTable) => any;                                                                                                   
    };                                                                                                                                                             
}; 

// Apply to both client types
export function createLibSqlClient(
	url: string
): LibSQLDatabase<typeof schema> & PatchedSelectClient<typeof schema> {
	const client = createClient({ url });
	return drizzleLibSql(client, { schema }) as LibSQLDatabase<typeof schema> &
		PatchedSelectClient<typeof schema>;
}

export function createD1Client(
	database: D1Database
): DrizzleD1Database<typeof schema> & PatchedSelectClient<typeof schema> {
	return drizzleD1(database, { schema }) as DrizzleD1Database<typeof schema> &
		PatchedSelectClient<typeof schema>;
}

export type DrizzleClient =
    | ReturnType<typeof createLibSqlClient>
    | ReturnType<typeof createD1Client>
