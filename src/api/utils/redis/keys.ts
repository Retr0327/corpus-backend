import crypto from 'crypto';

type CorpusRedisKeyAction = { kind: 'concordance'; params: string } | { kind: 'boards' };

function hashURL(url: string) {
  return crypto.createHash('sha256').update(url).digest('hex');
}

function getCorpusRedisKey(action: CorpusRedisKeyAction) {
  switch (action.kind) {
    case 'concordance':
      return `corpus:concordance:${hashURL(action.params)}`;
    case 'boards':
      return `corpus:boards`;
    default:
      throw new Error('Invalid kind');
  }
}

export default getCorpusRedisKey;
