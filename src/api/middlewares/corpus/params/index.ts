import { RequestBody, CorpusRequest } from 'types';
import { Middleware } from '@koa/router';
import { buildTextPattern, buildFilterString } from './utils';

type Service = 'query' | 'csv';

type KoaState = {
  blacklabReuqestBody: { [key: string]: any };
};

const buildParams =
  (service: Service): Middleware<KoaState, RequestBody<CorpusRequest>> =>
  async (ctx, next) => {
    const { word, cqlEnable, media, postType, boards, start, end, page, fetchNumber, windowSize } =
      ctx.request.body;

    if (Number(start) > Number(end)) {
      ctx.status = 422;
      ctx.body = { status: 'failed', msg: 'starting year must not be later than the ending year' };
      return null;
    }

    let blacklabReuqestBody: { [key: string]: any } = {
      patt: buildTextPattern(cqlEnable, word, postType),
      filter: buildFilterString(media, boards, start, end),
    };

    if (service === 'query') {
      blacklabReuqestBody = {
        ...blacklabReuqestBody,
        outputformat: 'json',
        first: (page * fetchNumber - fetchNumber).toString(),
        number: fetchNumber.toString(),
        wordsaroundhit: windowSize,
      };
    } else {
      blacklabReuqestBody = {
        ...blacklabReuqestBody,
        outputformat: 'csv',
        indexname: 'indexes',
      };
    }

    ctx.state = { blacklabReuqestBody };
    return next();
  };

export default buildParams;
