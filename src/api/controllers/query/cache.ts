import redis from '@models/redis';
import getExpireHour from '@utils/redis';

async function cacheQueryResult(key: string, payload: object, hour: number = 0.5) {
  const expire = getExpireHour(hour); // default is 30 minutes
  redis.multi().hset(key, payload).expire(key, expire).exec();
}

export default cacheQueryResult;
