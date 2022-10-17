import { buildTextPattern, buildFilterString } from '@utils/blacklab/requestBody';
import { RequestBody, CorpusRequest } from 'types';
import { Middleware } from '@koa/router';

const buildParams =
  (service: 'query' | 'csv'): Middleware<{}, RequestBody<CorpusRequest>> =>
  async (ctx, next) => {
    const { word, cqlEnable, media, postType, boards, start, end, page, fetchNumber, windowSize } =
      ctx.request.body;

    if (Number(start) > Number(end)) {
      ctx.status = 422;
      ctx.body = { status: 'failed', msg: 'starting year must not be later than the ending year' };
      return null;
    }

    let requestBody: { [key: string]: any } = {
      patt: buildTextPattern(cqlEnable, word, postType),
      filter: buildFilterString(media, boards, start, end),
    };

    if (service === 'query') {
      requestBody = {
        ...requestBody,
        outputformat: 'json',
        first: (page * fetchNumber - fetchNumber).toString(),
        number: fetchNumber.toString(),
        wordsaroundhit: windowSize,
      };
    } else {
      requestBody = {
        ...requestBody,
        outputformat: 'csv',
        indexname: 'indexes',
      };
    }

    ctx.blacklabReuqestBody = requestBody;
    return next();
  };

export default buildParams;
