import Router from '@koa/router';
import { isCQL, buildParams } from '@middlewares';
import { handleQuery, handleCSVDownload } from '@controllers';
import { validateQuery, validateCSVDownload } from '@validations/blacklab';

const router = new Router({ prefix: '/corpus' });

router.use(isCQL());

router.post('/', validateQuery, buildParams('query'), handleQuery);
router.post('/csv', validateCSVDownload, buildParams('csv'), handleCSVDownload);

export default router;
