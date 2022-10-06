import Router from '@koa/router';
import handleQuery from '@controllers/query';
import handleCSVDownload from '@controllers/csv';
import handleGetBoards from '@controllers/boards';
import { isCQL, buildParams } from '@middlewares/corpus';
import { validateQuery, validateCSVDownload } from '@validations/blacklab';

const router = new Router({ prefix: '/corpus' });

router.use(isCQL());

router.post('/', validateQuery, buildParams('query'), handleQuery);
router.post('/csv', validateCSVDownload, buildParams('csv'), handleCSVDownload);
router.get('/boards', handleGetBoards);

export default router;
