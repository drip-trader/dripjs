import { HttpMethod } from 'dripjs-types';

import { Config, OrderbookRequest, OrderbookResponse, RestOrderbookL2Response, RestResponse } from '../../types';
import { Rest } from '../rest';
import { transform } from './helpers';

export class Orderbook extends Rest {
  private readonly endpoint = 'orderBook/L2';

  constructor(config: Config) {
    super(config);
  }

  async fetch(request: OrderbookRequest): Promise<RestOrderbookL2Response> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orderbook: transform(<OrderbookResponse[]>res.body),
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
