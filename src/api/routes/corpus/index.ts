import Router from '@koa/router';
import handleQuery from '@controllers/query';
import handleCSVDownload from '@controllers/csv';
import handleGetBoards from '@controllers/boards';
import { isCQL, hasBoards, buildParams, hasQueryResult } from '@middlewares/corpus';
import { validateQuery, validateCSVDownload } from '@validations/blacklab';

const router = new Router({ prefix: '/corpus' });

router.use(isCQL());

router.post('/', validateQuery, buildParams('query'), hasQueryResult(), handleQuery);
router.post('/csv', validateCSVDownload, buildParams('csv'), handleCSVDownload);
router.get('/boards', hasBoards(), handleGetBoards);

export default router;
