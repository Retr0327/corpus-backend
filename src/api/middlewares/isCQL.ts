import { CorpusRequest } from 'types';
import { Middleware } from '@koa/router';

const isCQL = (): Middleware => async (ctx, next) => {
  const { word, cqlEnable } = ctx.request.body as CorpusRequest;
  const cqlSyntax = /^\s*$|\s|\t|[(["'`].*?[)\]"'`]|[|]/g;

  const invalidQuery = cqlEnable === false && cqlSyntax.test(word);
  const invalidCQLQuery = cqlEnable === true && !cqlSyntax.test(word);

  if (invalidQuery || invalidCQLQuery) {
    ctx.status = 422;
    ctx.body = { status: 'failed', msg: 'syntax error in CorpusQL pattern' };
    return null;
  }

  next();
  return null;
};

export default isCQL;
