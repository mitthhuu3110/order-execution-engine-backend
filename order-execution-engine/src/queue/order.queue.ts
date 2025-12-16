import { Queue } from 'bullmq';
import { env } from '../config/env';

export const ORDER_QUEUE_NAME = 'order-execution-queue';

export const orderQueue = new Queue(ORDER_QUEUE_NAME, {
  connection: {
    url: env.REDIS_URL
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 500
    },
    removeOnComplete: true,
    removeOnFail: false
  }
});