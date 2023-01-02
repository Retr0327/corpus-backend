import { PREFIX } from '@config';
import Router from '@koa/router';
import corpusRouter from './corpus';

const entry = new Router({ prefix: PREFIX });

const routers = [corpusRouter];

routers.forEach((router) => {
  entry.use(router.routes());
  entry.use(router.allowedMethods());
});

export default entry;
