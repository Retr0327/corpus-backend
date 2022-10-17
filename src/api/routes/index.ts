import { PREFIX } from '@config';
import Router, { RouterContext } from '@koa/router';
import corpusRouter from './corpus';

const entry = new Router();

entry.prefix(PREFIX);

entry.get('/', (ctx: RouterContext) => {
  const ip = ctx.request.ip.replace('::ffff:', '');
  ctx.status = 200;
  ctx.body = { status: 'success', ip };
});

const routers = [corpusRouter];

routers.forEach((router) => {
  entry.use(router.routes());
  entry.use(router.allowedMethods());
});

export default entry;
