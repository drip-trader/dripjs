import { stringify } from 'querystring';

import { HttpMethod } from '@drip/types';

import { getRestAuthHeaders } from '../common';
import { Config, PrivateEndPoints, PublicEndPoints, RestResponse, restEndpoints, restApiBasePath } from '../types';
import fetch , {RequestInit} from 'node-fetch';

export class Rest {
  constructor(private config: Config) {}

  async request(method: HttpMethod, endpoint: PrivateEndPoints | PublicEndPoints, data: any): Promise<RestResponse> {
    const authHeaders = getRestAuthHeaders(method, endpoint, this.config.apiKey, this.config.apiSecret, data);
    const request: RequestInit = {
      method,
      headers: {
        ...authHeaders,
      },
    };
    let query = '';
    if (method === HttpMethod.POST) {
      request.body = JSON.stringify(data);
    } else {
      query = Object.keys(data).length !== 0 ? `?${stringify(data)}` : '';
    }
    const baseUrl = this.config.testnet ? restEndpoints.testnet : restEndpoints.production;
    const url = `${baseUrl}${restApiBasePath}${endpoint}${query}`;
    const response = await fetch(url, request);
    const json = await response.json();

    return {
      headers: response.headers,
      body: json,
    };
  }
}
