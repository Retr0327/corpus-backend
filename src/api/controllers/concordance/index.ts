import { hset } from '@utils/redis';
import { Middleware } from '@koa/router';
import { ConcordanceResponse } from 'types';
import getCorpusRedisKey from '@utils/redis/keys';
import { request, generateBlacklabURL } from '@utils/blacklab';
import validateGetConcordance from './validation';

const handleGetConcordance: Middleware = async (ctx) => {
  const { blacklabReuqestBody } = ctx.state;
  const params = new URLSearchParams(blacklabReuqestBody).toString();
  const url = generateBlacklabURL({ kind: 'concordance', params });
  const [result, error] = await request<ConcordanceResponse>(url);

  if (error !== null || result === null) {
    const code = error?.status || 500;
    const msg = error?.msg || 'internal server error';

    ctx.status = code;
    ctx.body = { status: 'failed', msg };
    return null;
  }

  if (!result.hits.length) {
    ctx.body = { status: 'success', msg: 'no hit' };
    return null;
  }

  const redisKey = getCorpusRedisKey({ kind: 'concordance', params });
  await hset(redisKey, { data: JSON.stringify(result) }, 0.2);
  ctx.body = { status: 'success', data: result };
  return null;
};

export default handleGetConcordance;
export { validateGetConcordance };
