import redis from '@models/redis';
import { Middleware } from '@koa/router';

const hasBoards: Middleware = async (ctx, next) => {
  const result = await redis.get('boards');

  if (result === null) {
    return next();
  }

  ctx.status = 200;
  ctx.body = { status: 'success', data: JSON.parse(result) };
  return null;
};

export default hasBoards;
