import Fastify, { FastifyInstance } from 'fastify';
import { env } from './config/env';

import './db/postgres';
import './db/redis';

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: env.NODE_ENV !== 'test'
  });

  app.get('/health', async () => {
    return {
      status: 'ok',
      env: env.NODE_ENV
    };
  });

  return app;
}