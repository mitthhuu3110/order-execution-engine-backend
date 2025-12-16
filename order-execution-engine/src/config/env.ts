export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3000,

  POSTGRES_URL:
    process.env.POSTGRES_URL ||
    'postgres://postgres:postgres@localhost:5432/order_engine',

  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379'
};