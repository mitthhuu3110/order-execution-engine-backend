import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Fastify instance
const app: FastifyInstance = Fastify({
  logger: true,
});

// Register plugins
app.register(fastifyCors, {
  origin: '*', // In production, replace with your frontend URL
});

// WebSocket support
app.register(fastifyWebsocket, {
  options: {
    maxPayload: 1048576, // 1MB
  },
});

// Health check endpoint
app.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start the server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    await app.listen({ port, host });
    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  app.log.info('SIGTERM signal received.');
  await app.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  app.log.info('SIGINT signal received.');
  await app.close();
  process.exit(0);
});

// Start the application
start();

export { app };
