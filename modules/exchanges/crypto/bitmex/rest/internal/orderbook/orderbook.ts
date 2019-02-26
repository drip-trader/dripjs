import { HttpMethod } from 'dripjs-types';

import { Config, OrderbookResponse, RestOrderbookL2Response, RestOrderbookRequest, RestResponse } from '../../../types';
import { Rest } from '../rest';
import { transform } from './helpers';

export class Orderbook extends Rest {
  private readonly endpoint = 'orderBook/L2';

  constructor(config: Config) {
    super(config);
  }

  async fetch(request: RestOrderbookRequest): Promise<RestOrderbookL2Response> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orderbook: transform(<OrderbookResponse[]>res.body),
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
