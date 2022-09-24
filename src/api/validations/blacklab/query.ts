import { object } from 'yup';
import validate from '../validator';
import objectSchema from './objectSchema';

const requestSchema = object(objectSchema).noUnknown(true).strict();

const validateQuery = validate(requestSchema);

export default validateQuery;
