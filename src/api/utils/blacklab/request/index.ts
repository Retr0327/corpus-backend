import { BLACKLAB_URL } from '@config';
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

  try {
    const response = await axios(requestConfig);
    return response.data as unknown as T;
  } catch (error) {
    return false;
  }
}

export default request;
