const PREFIX = process.env.NODE_ENV === 'production' ? '/' : '/api';

const { BLACKLAB_URL } = process.env;

if (!BLACKLAB_URL) {
  throw new Error('BLACKLAB_URL undefined');
}

export { PREFIX, BLACKLAB_URL };
