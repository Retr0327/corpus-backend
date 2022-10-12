export type PostType =
  | 'title'
  | 'body'
  | 'commentAll'
  | 'commentPos'
  | 'commentNeu'
  | 'commentNeg'
  | '';

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

// ------ blacklab types ------

export interface BlacklabResponse {
  summary: Summary;
  hits: Hit[] | [];
  docInfos: DocInfos | {};
}

export interface Hit {
  docPid: string;
  start: number;
  end: number;
  left: HitData;
  match: HitData;
  right: HitData;
}

export interface HitData {
  punct: string[];
  pos: string[];
  word: string[];
}

export interface DocInfos {
  [key: string]: {
    fromInputFile: string[];
    year: string[];
    author: string[];
    media: string[];
    doc_id: string[];
    board: string[];
    lengthInTokens: number;
    mayView: boolean;
  };
}

export interface Summary {
  searchParam: SearchParam;
  searchTime: number;
  countTime: number;
  windowFirstResult: number;
  requestedWindowSize: number;
  actualWindowSize: number;
  windowHasPrevious: boolean;
  windowHasNext: boolean;
  stillCounting: boolean;
  numberOfHits: number;
  numberOfHitsRetrieved: number;
  stoppedCountingHits: boolean;
  stoppedRetrievingHits: boolean;
  numberOfDocs: number;
  numberOfDocsRetrieved: number;
  docFields: DocFields;
  metadataFieldDisplayNames: MetadataFieldDisplayNames;
}

export interface DocFields {
  pidField: string;
  titleField: string;
  authorField: string;
  dateField: string;
}

export interface MetadataFieldDisplayNames {
  author: string;
  board: string;
  doc_id: string;
  fromInputFile: string;
  media: string;
  year: string;
}

export interface SearchParam {
  filter: string;
  first: string;
  indexname: string;
  number: string;
  patt: string;
  wordsaroundhit: string;
}

export type Boards = {
  indexName: string;
  fieldName: string;
  isAnnotatedField: boolean;
  displayName: string;
  description: string;
  uiType: string;
  type: string;
  analyzer: string;
  unknownCondition: string;
  unknownValue: string;
  displayValues: { [key: string]: any };
  fieldValues: { [key: string]: number };
  valueListComplete: boolean;
};
