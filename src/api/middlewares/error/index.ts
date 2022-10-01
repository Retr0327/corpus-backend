import { Middleware } from '@koa/router';

const handleError = (): Middleware => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    ctx.body = { status: 'failed' };
  }
};

export default handleError;
