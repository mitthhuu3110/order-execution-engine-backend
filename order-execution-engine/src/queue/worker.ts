import { Worker, Job } from 'bullmq';
import { env } from '../config/env';
import { ORDER_QUEUE_NAME } from './order.queue';

export const orderWorker = new Worker(
  ORDER_QUEUE_NAME,
  async (job: Job) => {
    console.log('Processing order job:', job.id, job.data);
  },
  {
    connection: {
      url: env.REDIS_URL
    },
    concurrency: 10,
    limiter: {
      max: 100,
      duration: 60_000 // 100 jobs per minute
    }
  }
);

orderWorker.on('completed', (job) => {
  console.log(`✅ Order job ${job.id} completed`);
});

orderWorker.on('failed', (job, err) => {
  console.error(`❌ Order job ${job?.id} failed`, err);
});