import { object } from 'yup';
import validate from '../validator';
import objectSchema from './objectSchema';

const { word, media, cqlEnable, postType, boards, start, end } = objectSchema;

const requestSchema = object({
  word,
  media,
  cqlEnable,
  postType,
  boards,
  start,
  end,
})
  .noUnknown(true)
  .strict();

const validateCSVDownload = validate(requestSchema);

export default validateCSVDownload;
