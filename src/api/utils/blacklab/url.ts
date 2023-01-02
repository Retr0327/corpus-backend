import { BLACKLAB_URL } from '@config';

type BlacklabUrlAction = { kind: 'boards' } | { kind: 'concordance'; params: string };

const generateBlacklabURL = (action: BlacklabUrlAction) => {
  const params = new URLSearchParams();
  params.set('outputformat', 'json');

  switch (action.kind) {
    case 'boards':
      return `${BLACKLAB_URL}/indexes/fields/board?${params.toString()}`;
    case 'concordance':
      return `${BLACKLAB_URL}/indexes/hits?${action.params}`;
    default:
      throw new Error('Invalid kind');
  }
};

export default generateBlacklabURL;
