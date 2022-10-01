import { BlacklabResponse } from 'types';
import { Middleware } from '@koa/router';
import request from '@utils/blacklab/request';

const handleQuery: Middleware = async (ctx) => {
  try {
    const { blacklabReuqestBody } = ctx;
    const blacklabParams = new URLSearchParams(blacklabReuqestBody).toString();
    const response = await request<BlacklabResponse>(`hits/?${blacklabParams}`);

    if (response.hits.length === 0) {
      ctx.status = 200;
      ctx.body = { status: 'success', msg: 'no hits' };
      return;
    }

    ctx.status = 200;
    ctx.body = { status: 'success', data: { ...response } };
  } catch (error) {
    ctx.status = 404;
    ctx.body = { status: 'failed', msg: 'not found' };
  }
};

export default handleQuery;
