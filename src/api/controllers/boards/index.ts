import { Boards } from 'types';
import { Middleware } from '@koa/router';
import request from '@utils/blacklab/request';

const handleGetBoards: Middleware = async (ctx) => {
  const response = await request<Boards>('fields/board?outputformat=json');

  ctx.status = 200;
  ctx.body = { status: 'success', data: response.fieldValues };
};

export default handleGetBoards;
