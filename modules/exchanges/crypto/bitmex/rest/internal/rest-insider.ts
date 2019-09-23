import { HttpHeaders, HttpMethod } from '@dripjs/types';
import Axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { getRateLimit, getRestAuthHeaders } from '../../common';
import { MAX_REMAINING_NUM } from '../../constants';
import { Config, ErrorResponse, ResponseType, RestResponse } from '../../types';
import { RestPrivateEndPoints, RestPublicEndPoints, restApiBasePath, restEndpoints } from '../types';
import { makeErrorResponse, validateRemaining } from './function';

export class RestInsider {
  /**可用请求数 */
  private remaining = MAX_REMAINING_NUM;

  constructor(private readonly config: Config, private readonly endpoint: RestPrivateEndPoints | RestPublicEndPoints) {
    if (!this.config.apiKey || this.config.apiKey === 'undefined') {
      this.config.apiKey = '';
    }
    if (!this.config.apiSecret || this.config.apiSecret === 'undefined') {
      this.config.apiSecret = '';
    }
    setInterval(() => {
      this.remaining = 60;
    }, 60 * 1000);
  }

  protected async request<T>(method: HttpMethod, data: any): Promise<RestResponse<T> | ErrorResponse> {
    return this.requestWithEndpoint(this.endpoint, method, data);
  }

  protected async requestWithEndpoint<T>(
    endpoint: RestPrivateEndPoints | RestPublicEndPoints,
    method: HttpMethod,
    data: any,
  ): Promise<RestResponse<T> | ErrorResponse> {
    const error = validateRemaining(this.remaining);
    if (error) {
      return {
        ratelimit: {
          remaining: this.remaining,
          reset: 0,
          limit: 60,
        },
        error,
        type: ResponseType.Error,
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
    const baseUrl = this.config.testnet ? restEndpoints.testnet : restEndpoints.production;
    const url = `${baseUrl}${restApiBasePath}${endpoint}${query}`;

    try {
      const response = await Axios(url, request);

      const ratelimit = getRateLimit(<HttpHeaders>response.headers);
      this.remaining = ratelimit.remaining;

      return {
        type: ResponseType.Rest,
        ratelimit,
        data: response.data,
      };
    } catch (error) {
      return makeErrorResponse(error);
    }
  }
}
