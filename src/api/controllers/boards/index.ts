import { Boards } from 'types';
import { Middleware } from '@koa/router';
import request from '@utils/blacklab/request';
import generateBoards from './utils';

const handleGetBoards: Middleware = async (ctx) => {
  const response = await request<Boards>('fields/board?outputformat=json');
  const boards = Object.keys(response.fieldValues);

  const isDcard = /.*(?=-dcard)/;
  const isPtt = /.*(?=-ptt)/;

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: {
      ptt: generateBoards(boards, isPtt),
      dcard: generateBoards(boards, isDcard),
    },
  };
};

export default handleGetBoards;
