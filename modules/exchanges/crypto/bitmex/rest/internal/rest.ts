import Axios, { AxiosRequestConfig } from 'axios';
import { HttpHeaders, HttpMethod } from 'dripjs-types';
import { stringify } from 'qs';

import { getRateLimit, getRestAuthHeaders } from '../../common';
import { BitmexConfig, BitmexErrorResponse, RestResponse, bitmexRestApiBasePath, bitmexRestEndpoints } from '../../types';

export class Rest {
  private remaining = 300;

  constructor(private readonly config: BitmexConfig) {
    if (!this.config.apiKey || this.config.apiKey === 'undefined') {
      this.config.apiKey = '';
    }
    if (!this.config.apiSecret || this.config.apiSecret === 'undefined') {
      this.config.apiSecret = '';
    }
  }

  protected async request(method: HttpMethod, endpoint: string, data: any): Promise<RestResponse> {
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

    const authHeaders = getRestAuthHeaders(method, endpoint, this.config.apiKey, this.config.apiSecret, data);
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
    const baseUrl = this.config.testnet ? bitmexRestEndpoints.testnet : bitmexRestEndpoints.production;
    const url = `${baseUrl}${bitmexRestApiBasePath}${endpoint}${query}`;

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

  private validate(): BitmexErrorResponse {
    const errorRes: BitmexErrorResponse = {};
    if (this.remaining < 20) {
      errorRes.error = {
        name: 'validate failed (remaining)',
        message: 'The remaining is less than 20',
      };
    }

    return errorRes;
  }
}
