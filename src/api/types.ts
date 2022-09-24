export type PostType = 'title' | 'body' | 'commentAll' | 'commentPos' | 'commentNeu' | 'commentNeg';

export type CorpusRequest = {
  word: string;
  cqlEnable: boolean;
  media: string | null;
  postType: PostType;
  boards: string | null;
  start: string;
  end: string;
  windowSize: string;
  page: number;
  fetchNumber: number;
};
