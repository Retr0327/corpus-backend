import { BlacklabResponse } from 'types';
import { Middleware } from '@koa/router';
import request from '@utils/blacklab/request';
import cacheQueryResult from './cache';

const handleQuery: Middleware = async (ctx) => {
  try {
    const { blacklabReuqestBody } = ctx;
    const blacklabParams = new URLSearchParams(blacklabReuqestBody).toString();
    const response = await request<BlacklabResponse>(`hits/?${blacklabParams}`);

    if (!response || response.hits.length === 0) {
      ctx.status = 200;
      ctx.body = { status: 'success', msg: 'no hits' };
      return;
    }

    await cacheQueryResult(blacklabParams, { data: JSON.stringify(response) }, 0.2);
    ctx.status = 200;
    ctx.body = { status: 'success', data: response };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    ctx.status = 500;
    ctx.body = { status: 'failed', msg: 'internal server error' };
  }
};

export default handleQuery;
