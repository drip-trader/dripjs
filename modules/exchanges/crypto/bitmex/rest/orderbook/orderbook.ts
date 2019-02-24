import { HttpMethod } from 'dripjs-types';

import {
  BitmexConfig,
  BitmexOrderbookResponse,
  BitmexRestOrderbookL2Response,
  BitmexRestOrderbookRequest,
  RestResponse,
} from '../../types';
import { Rest } from '../rest';
import { transform } from './helpers';

export class Orderbook extends Rest {
  private readonly endpoint = 'orderBook/L2';

  constructor(config: BitmexConfig) {
    super(config);
  }

  async fetch(request: BitmexRestOrderbookRequest): Promise<BitmexRestOrderbookL2Response> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orderbook: transform(<BitmexOrderbookResponse[]>res.body),
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
