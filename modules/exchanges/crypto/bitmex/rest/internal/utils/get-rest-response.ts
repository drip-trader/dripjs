import { AxiosResponse } from 'axios';

import { getRateLimit } from '../../../common';
import { RestResponse } from '../../types';

export function getRestResponse<T>(source: AxiosResponse<T>): RestResponse<T> {
  return {
    rateLimit: getRateLimit(source.headers),
    data: source.data,
  };
}
