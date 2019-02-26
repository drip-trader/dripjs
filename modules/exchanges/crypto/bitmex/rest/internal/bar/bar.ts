import { HttpMethod } from 'dripjs-types';

import { BarResponse, Config, PublicEndPoints, RestBarRequest, RestBarResponse, RestResponse } from '../../../types';
import { Rest } from '../rest';

export class Bar extends Rest {
  private readonly endpoint = PublicEndPoints.TradeBucketed;

  constructor(config: Config) {
    super(config);
  }

  async fetch(request: RestBarRequest): Promise<RestBarResponse> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      bars: <BarResponse[]>res.body,
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
