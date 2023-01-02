const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

const PREFIX = isProduction ? '/api/v1' : '/service/api/v1';
const BLACKLAB_URL = isProduction
  ? 'http://nginx:80/service/blacklab/api/v1'
  : process.env.BLACKLAB_URL;

if (!BLACKLAB_URL) {
  throw new Error('BLACKLAB_URL undefined');
}

export { PREFIX, BLACKLAB_URL };
