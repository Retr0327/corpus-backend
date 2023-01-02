import redis from '@models/redis';
import { isEmptyObject } from '@utils';
import { Middleware } from '@koa/router';
import getCorpusRedisKey from '@utils/redis/keys';

const hasConcordance: Middleware = async (ctx, next) => {
  const { blacklabReuqestBody } = ctx.state;
  const params = new URLSearchParams(blacklabReuqestBody).toString();
  const redisKey = getCorpusRedisKey({ kind: 'concordance', params });
  const result = await redis.hgetall(redisKey);

  if (isEmptyObject(result)) {
    return next();
  }

  ctx.status = 200;
  ctx.body = { status: 'success', data: JSON.parse(result.data) };
  return null;
};

export default hasConcordance;
