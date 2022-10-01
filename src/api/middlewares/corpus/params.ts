import { buildTextPattern, buildFilterString } from '@utils/blacklab/requestBody';
import { CorpusRequest } from 'types';
import { Middleware } from '@koa/router';

type Service = 'query' | 'csv';

const buildParams =
  (service: Service): Middleware =>
  async (ctx, next) => {
    const { word, cqlEnable, media, postType, boards, start, end, page, fetchNumber, windowSize } =
      ctx.request.body as CorpusRequest;

    if (Number(end) > Number(start)) {
      ctx.status = 422;
      ctx.body = { status: 'failed', msg: 'starting year must not be later than the ending year' };
      return null;
    }

    const textPattern = buildTextPattern(cqlEnable, word, postType);
    const filterString = buildFilterString(media, boards, start, end);

    let requestBody: { [key: string]: any } = {
      patt: textPattern,
      filter: filterString,
    };

    switch (service) {
      case 'csv':
        requestBody = {
          outputformat: 'csv',
          indexname: 'indexes',
          ...requestBody,
        };
        break;

      default:
        requestBody = {
          outputformat: 'json',
          first: (page * fetchNumber).toString(),
          number: fetchNumber.toString(),
          wordsaroundhit: windowSize,
          ...requestBody,
        };
        break;
    }

    ctx.blacklabReuqestBody = requestBody;
    return next();
  };

export default buildParams;
