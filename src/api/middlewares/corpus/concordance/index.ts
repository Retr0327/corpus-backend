import { Middleware } from '@koa/router';
import { RequestBody, ConcordanceRequest } from 'types';

const isCQL: Middleware<{}, RequestBody<ConcordanceRequest>> = async (ctx, next) => {
  const { word, cqlEnable } = ctx.request.body;
  const cqlPattern = /^\s*$|[(["'`].*?[)\]"'`]|[|]/g;
  const shouldDisable = !cqlPattern.test(word) && cqlEnable === true;
  const shouldEnable = cqlPattern.test(word) && cqlEnable === false;

  if (shouldDisable || shouldEnable) {
    const errorMessage = shouldDisable ? 'disable' : 'enable';
    ctx.status = 422;
    ctx.body = { status: 'failed', msg: `please ${errorMessage} cql query in request body` };
    return null;
  }

  return next();
};

export default isCQL;
