import Koa from 'koa';
import router from '@routes';
import koaEtag from 'koa-etag';
import morgan from 'koa-morgan';
import cors from '@middlewares/cors';
import bodyParser from 'koa-bodyparser';
import customDevFormat from '@utils/logger';
import handleError from '@middlewares/error';
import koaConditionalGet from 'koa-conditional-get';

morgan.format('custom-dev', customDevFormat);

const app = new Koa();

app.use(morgan('custom-dev'));
app.use(handleError());
app.use(koaConditionalGet());
app.use(koaEtag());
app.use(cors());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
