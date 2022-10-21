import { Boards } from 'types';
import redis from '@models/redis';
import setExpireDate from '@utils/redis';
import { Middleware } from '@koa/router';
import request from '@utils/blacklab';
import generateBoards from './utils';

const handleGetBoards: Middleware = async (ctx) => {
  const [result, error] = await request<Boards>('fields/board?outputformat=json');

  if (result === null || error) {
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
    return;
  }

  const allBoards = Object.keys(result.fieldValues);

  const isDcard = /.*(?=-dcard)/;
  const isPtt = /.*(?=-ptt)/;

  const data = {
    ptt: generateBoards(allBoards, isPtt),
    dcard: generateBoards(allBoards, isDcard),
  };

  const cachedData = JSON.stringify(data);
  const ttl = setExpireDate(1);
  redis.multi().set('boards', cachedData).expire('boards', ttl).exec();

  ctx.status = 200;
  ctx.body = { status: 'success', data };
};

export default handleGetBoards;
