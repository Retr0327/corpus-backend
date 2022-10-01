const isProduction = process.env.NODE_ENV === 'production';

const PREFIX = isProduction ? '/api' : '/';

const BLACKLAB_URL = isProduction
  ? 'http://blacklab/blacklab-server/indexes/'
  : 'http://blacklab:8080/blacklab-server/indexes/';

export { PREFIX, BLACKLAB_URL };
