import axios, { AxiosRequestConfig } from 'axios';
import { BlacklabErrorResponse } from 'types';

async function request<T>(
  url: string,
): Promise<[T | null, { status?: number; msg?: string } | null]> {
  try {
    const config: AxiosRequestConfig = {
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 5 * 1000,
    };

    const response = await axios.get<T>(url, config);
    return [response.data, null];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status >= 400) {
        const errorData = error.response.data as BlacklabErrorResponse;
        return [null, { status: error.response.status, msg: errorData.error.message }];
      }
    }

    return [null, error as any];
  }
}

export default request;
