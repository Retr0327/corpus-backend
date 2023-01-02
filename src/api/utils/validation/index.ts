import { z } from 'zod';
import { Middleware } from '@koa/router';

const validate =
  <T extends z.ZodTypeAny>(schema: T): Middleware =>
  (ctx, next) => {
    const result = schema.safeParse(ctx.request.body);

    if (!result.success) {
      ctx.status = 422;
      ctx.body = { status: 'failed', msg: 'invalid request body' };
      return null;
    }

    return next();
  };

export default validate;
