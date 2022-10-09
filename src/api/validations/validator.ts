import { SchemaOf } from 'yup';
import { Middleware } from '@koa/router';

function validate<T>(schema: SchemaOf<T>): Middleware {
  return (ctx, next) => {
    try {
      schema.validateSync(ctx.request.body);
      return next();
    } catch (error) {
      ctx.status = 422;
      ctx.body = { status: 'failed', msg: 'invalid request body' };
      return null;
    }
  };
}

export default validate;
