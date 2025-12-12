import { FastifyBaseLogger } from 'fastify';
import { env } from '../config/env.js';

class Logger {
  private logger: FastifyBaseLogger;

  constructor(logger: FastifyBaseLogger) {
    this.logger = logger;
  }

  info(message: string, context?: Record<string, unknown>) {
    this.logger.info({ ...context }, message);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.logger.error(
      {
        ...context,
        error: error ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        } : undefined,
      },
      message
    );
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.logger.warn({ ...context }, message);
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (env.NODE_ENV !== 'production') {
      this.logger.debug({ ...context }, message);
    }
  }

  child(context: Record<string, unknown>) {
    return new Logger(this.logger.child(context));
  }
}

export { Logger };
