import Router from '@koa/router';
import handleGetBoards from '@controllers/boards';
import hasBoards from '@middlewares/corpus/boards';
import isCQL from '@middlewares/corpus/concordance';
import createQuery from '@middlewares/corpus/concordance/query';
import hasConcordance from '@middlewares/corpus/concordance/cache';
import handleGetConcordance, { validateGetConcordance } from '@controllers/concordance';

const router = new Router({ prefix: '/corpus' });

router.post(
  '/concordance',
  validateGetConcordance,
  isCQL,
  createQuery('concordance'),
  hasConcordance,
  handleGetConcordance,
);

router.get('/boards', hasBoards, handleGetBoards);

export default router;
