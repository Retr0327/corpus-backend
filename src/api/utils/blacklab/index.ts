import { BLACKLAB_URL } from '@config';
import axios, { AxiosRequestConfig } from 'axios';

type BlacklabErrorResponse = {
  error: { code: string; message: string };
};

async function request<T>(
  blacklabParams: string,
): Promise<[T | null, { status?: number; msg?: string } | null]> {
  const url = BLACKLAB_URL + blacklabParams;

  const requestConfig: AxiosRequestConfig = {
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get<T>(url, requestConfig);
    return [response.data, null];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status >= 400) {
        const errorData = error.response.data as BlacklabErrorResponse;
        return [null, { status: error.response.status, msg: errorData.error.message }];
      }

      return [null, {}];
    }

    return [null, {}];
  }
}

export default request;
