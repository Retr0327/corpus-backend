import { Middleware } from '@koa/router';
import { SchemaOf, ValidationError } from 'yup';

function validate<T>(schema: SchemaOf<T>): Middleware {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      return next(); // eslint-disable-line @typescript-eslint/return-await
    } catch (error) {
      const errors = error as ValidationError;
      console.log(errors); // eslint-disable-line no-console
      ctx.status = 422;
      ctx.body = { status: 'failed', msg: 'invalid request body' };
    }
    return null;
  };
}

export default validate;
