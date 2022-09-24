import { BLACKLAB_URL } from '@configs';
import axios, { AxiosRequestConfig } from 'axios';

async function request<T>(blacklabParams: string) {
  const url = BLACKLAB_URL + blacklabParams;

  const requestConfig: AxiosRequestConfig = {
    method: 'GET',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await axios(requestConfig);
  return response.data as unknown as T;
}

export default request;