import redis from '@models/redis';

function setExpireHour(hour: number) {
  const oneHour = 60 * 60;
  return Math.ceil(oneHour * hour);
}

async function hset(key: string, payload: object, hour: number = 0.5) {
  const expire = setExpireHour(hour);
  await redis.multi().hset(key, payload).expire(key, expire).exec();
}

export { setExpireHour, hset };
