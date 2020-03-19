import redis from 'redis';
import { promisify } from 'util';
const url = process.env.REDIS_URL || 'redis://localhost:6379';

const client = redis.createClient(url);

client.on("error", (error) => {
  console.error(error);
});

export const setAsync = promisify(client.set).bind(client);
export const getAsync = promisify(client.get).bind(client);
