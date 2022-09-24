import { string, number, boolean } from 'yup';

const objectSchema = {
  word: string().required(),
  media: string().nullable(),
  cqlEnable: boolean().required(),
  postType: string().required(),
  boards: string().nullable(),
  start: string().required(),
  end: string().required(),
  windowSize: string().required(),
  page: number().required(),
  fetchNumber: number().required(),
};

export default objectSchema;
