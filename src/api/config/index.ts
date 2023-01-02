const nodeEnv = process.env.NODE_ENV;
const blacklabUrl = process.env.BLACKLAB_URL;
const isProduction = nodeEnv === 'production';

if (!blacklabUrl) {
  throw new Error('BLACKLAB_URL undefined');
}

const PREFIX = isProduction ? '/api/v1' : '/service/api/v1';
const BLACKLAB_URL = isProduction ? 'http://nginx:80/service/blacklab/api/v1' : blacklabUrl;

export { PREFIX, BLACKLAB_URL };
