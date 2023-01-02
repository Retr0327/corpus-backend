import { Middleware } from 'koa';
import { RequestBody, ConcordanceRequest } from 'types';
import { buildFilterString, buildTextPattern } from './utils';

type Action = 'concordance' | 'csv';

type KoaState = {
  blacklabReuqestBody: { [key: string]: any };
};

function createBlacklabReqBody(action: Action, payload: ConcordanceRequest) {
  const { cqlEnable, word, postType, media, boards, start, end, page, fetchNumber, windowSize } =
    payload;
  const patt = buildTextPattern(cqlEnable, word, postType);
  const filter = buildFilterString(media, boards, start, end);

  switch (action) {
    case 'csv':
      return {
        patt,
        filter,
        outputformat: 'csv',
        indexname: 'indexes',
      };

    default:
      return {
        patt,
        filter,
        outputformat: 'json',
        first: page * fetchNumber - fetchNumber,
        number: fetchNumber,
        wordsaroundhit: windowSize,
      };
  }
}

const createQuery =
  (action: Action): Middleware<KoaState, RequestBody<ConcordanceRequest>> =>
  async (ctx, next) => {
    const { start, end } = ctx.request.body;

    if (Number(start) > Number(end)) {
      ctx.status = 422;
      ctx.body = { status: 'failed', msg: 'starting year must not be later than the ending year' };
      return null;
    }

    const blacklabReuqestBody = createBlacklabReqBody(action, ctx.request.body);
    ctx.state = { blacklabReuqestBody };
    return next();
  };

export default createQuery;
