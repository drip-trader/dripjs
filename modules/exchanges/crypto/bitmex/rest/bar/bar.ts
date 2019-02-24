import { HttpMethod } from 'dripjs-types';

import {
  BitmexBarResponse,
  BitmexConfig,
  BitmexPublicEndPoints,
  BitmexRestBarRequest,
  BitmexRestBarResponse,
  RestResponse,
} from '../../types';
import { Rest } from '../rest';

export class Bar extends Rest {
  private readonly endpoint = BitmexPublicEndPoints.TradeBucketed;

  constructor(config: BitmexConfig) {
    super(config);
  }

  async fetch(request: BitmexRestBarRequest): Promise<BitmexRestBarResponse> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      bars: <BitmexBarResponse[]>res.body,
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
