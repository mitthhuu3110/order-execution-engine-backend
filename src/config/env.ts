import { z } from 'zod';

// Define a reusable port schema
const portSchema = z.string()
  .transform((val) => parseInt(val, 10))
  .refine((val) => !isNaN(val) && val > 0 && val < 65536, {
    message: 'Port must be a number between 1 and 65535',
  });

// Define the environment schema
const envSchema = z.object({
  // Server Configuration
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: portSchema.default('3000'),
  HOST: z.string().default('0.0.0.0'),
  
  // Database Configuration
  DB_HOST: z.string().default('localhost'),
  DB_PORT: portSchema.default('5432'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_NAME: z.string().default('order_engine'),
  
  // Redis Configuration
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: portSchema.default('6379'),
  
  // Logging
  LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
    .default('info'),
    
  // API Keys (optional for now)
  RAYDIUM_API_KEY: z.string().optional(),
  METEORA_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

// Validate and parse environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format());
  process.exit(1);
}

export default env.data;
