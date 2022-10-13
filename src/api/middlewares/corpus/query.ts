import redis from '@models/redis';
import { Middleware } from '@koa/router';

const hasQueryResult = (): Middleware => async (ctx, next) => {
  const { blacklabReuqestBody } = ctx;
  const blacklabParams = new URLSearchParams(blacklabReuqestBody).toString();
  const result = await redis.hgetall(blacklabParams);

  if (!Object.values(result).length) {
    return next();
  }

  ctx.status = 200;
  ctx.body = { status: 'success', data: JSON.parse(result.data) };
  return null;
};

export default hasQueryResult;
