// /configs/index.js

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Fetch the database URL from environment variables
const databaseUrl = import.meta.env.VITE_DRIZZLE_DATABASE_URL;

// Initialize NeonDB connection using drizzle
const sql = neon(databaseUrl, {
    ssl: true, // Ensure SSL is enabled for production
});

// Export the Drizzle connection with the schema
export const db = drizzle(sql, { schema });
