import { Pool } from 'pg';
import { env } from '../config/env';

export const pgPool = new Pool({
  connectionString: env.POSTGRES_URL
});

pgPool.on('connect', () => {
  console.log('🐘 Connected to PostgreSQL');
});

pgPool.on('error', (err) => {
  console.error('PostgreSQL error', err);
});