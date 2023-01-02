import { Boards } from 'types';
import { hset } from '@utils/redis';
import { Middleware } from '@koa/router';
import getCorpusRedisKey from '@utils/redis/keys';
import { request, generateBlacklabURL } from '@utils/blacklab';
import generateBoards from './utils';

export async function fetchBoards() {
  const url = generateBlacklabURL({ kind: 'boards' });
  const [result, error] = await request<Boards>(url);
  if (error || !result) return null;

  const boards = Object.keys(result.fieldValues);
  const isDcard = /.*(?=-dcard)/;
  const isPtt = /.*(?=-ptt)/;

  return {
    ptt: generateBoards(boards, isPtt),
    dcard: generateBoards(boards, isDcard),
  };
}

const handleGetBoards: Middleware = async (ctx) => {
  const data = await fetchBoards();

  if (data === null) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
    return null;
  }

  const { type } = ctx.request.query as { type: keyof typeof data | undefined };
  const redisKey = getCorpusRedisKey({ kind: 'boards' });

  await hset(redisKey, data);
  const filteredData = type === undefined ? data : { [`${type}`]: data[type] };

  ctx.body = { status: 'success', data: filteredData };
  return null;
};

export default handleGetBoards;
