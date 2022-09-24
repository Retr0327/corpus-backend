import { PostType } from 'types';

type PostTypeFactories = { [key in PostType as string]: string };

const postTypeFactories: PostTypeFactories = {
  title: ' within <title/>',
  body: ' within <body/>',
  commentPos: ' within <comment c_type="pos"/>',
  commentNeg: ' within <comment c_type="neg"/>',
  commentNeu: ' within <comment c_type="neu"/>',
  commentAll: ' within <comment/>',
};

function buildTextPattern(cqlEnable: boolean, word: string, postType: PostType) {
  const within = postTypeFactories[postType];
  const queryString = cqlEnable
    ? word
    : word
        .split(' ')
        .map((value) => `[word="${value.trim()}"]`)
        .join('');

  if (word.includes('::')) {
    const queryList = queryString.split('::');
    queryList.splice(1, 0, within);
    queryList.splice(2, 0, '::');
    return queryList.join('');
  }

  return queryString + within;
}

export default buildTextPattern;
