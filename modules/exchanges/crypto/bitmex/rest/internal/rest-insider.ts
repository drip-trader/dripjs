import { HttpHeaders, HttpMethod } from '@dripjs/types';
import Axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { getRateLimit, getRestAuthHeaders } from '../../common';
import { Config, ErrorResponse, RestResponse } from '../../types';
import { PrivateEndPoints, PublicEndPoints, apiBasePath, endpoints } from '../types';

export class RestInsider {
  /**可用请求数 */
  private remaining = 300;

  constructor(private readonly config: Config, private readonly endpoint: PrivateEndPoints | PublicEndPoints) {
    if (!this.config.apiKey || this.config.apiKey === 'undefined') {
      this.config.apiKey = '';
    }
    if (!this.config.apiSecret || this.config.apiSecret === 'undefined') {
      this.config.apiSecret = '';
    }
    // 每30分钟重置remaining
    setTimeout(() => (this.remaining = 300), 30 * 60 * 1000);
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    const validate = this.validate();
    if (validate.error) {
      return {
        ratelimit: {
          remaining: this.remaining,
          reset: 0,
          limit: 300,
        },
        body: {},
        error: validate.error,
      };
    }

    const authHeaders = getRestAuthHeaders(method, this.endpoint, this.config.apiKey, this.config.apiSecret, data);
    const request: AxiosRequestConfig = {
      method,
      headers: {
        ...authHeaders,
      },
    };
    let query = '';
    if (method !== HttpMethod.GET) {
      request.data = data;
    } else {
      query = Object.keys(data).length !== 0 ? `?${stringify(data)}` : '';
    }
    const baseUrl = this.config.testnet ? endpoints.testnet : endpoints.production;
    const url = `${baseUrl}${apiBasePath}${this.endpoint}${query}`;

    try {
      const response = await Axios(url, request);

      const ratelimit = getRateLimit(<HttpHeaders>response.headers);
      this.remaining = ratelimit.remaining;

      return {
        ratelimit,
        body: response.data,
      };
    } catch (error) {
      return {
        ratelimit: getRateLimit(<HttpHeaders>error.response.headers),
        body: {},
        error: error.response.data.error,
      };
    }
  }

  private validate(): ErrorResponse {
    const errorRes: ErrorResponse = {};
    if (this.remaining < 20) {
      errorRes.error = {
        name: 'validate failed (remaining)',
        message: 'The remaining is less than 20',
      };
    }

    return errorRes;
  }
}
