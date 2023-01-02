import redis from '@models/redis';
import { isEmptyObject } from '@utils';
import { Middleware } from '@koa/router';
import getCorpusRedisKey from '@utils/redis/keys';

const hasBoards: Middleware = async (ctx, next) => {
  const redisKey = getCorpusRedisKey({ kind: 'boards' });
  const result = await redis.hgetall(redisKey);

  if (isEmptyObject(result)) return next();

  const data = Object.entries(result).reduce((prev, cur) => {
    const temp = prev;
    temp[cur[0]] = cur[1].split(',');
    return temp;
  }, {} as { [key: string]: any });

  const { type } = ctx.request.query as { type: keyof typeof data | undefined };
  const filteredData = type === undefined ? data : { [`${String(type)}`]: data[type] };

  ctx.status = 200;
  ctx.body = { status: 'success', data: filteredData };
  return null;
};

export default hasBoards;
