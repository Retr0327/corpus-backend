import { z } from 'zod';
import validate from '@utils/validation';

const validateGetConcordance = validate(
  z
    .object({
      word: z.string().min(1),
      media: z.string().nullable(),
      cqlEnable: z.boolean(),
      postType: z.string().nullable(),
      boards: z.array(z.string().min(1)).min(1).nullable(),
      start: z.string().min(1),
      end: z.string().min(1),
      windowSize: z.string().min(1),
      page: z.number(),
      fetchNumber: z.number(),
    })
    .strict(),
);

export default validateGetConcordance;
