import { HttpMethod } from 'dripjs-types';

import {
  BitmexConfig,
  BitmexOrderResponse,
  BitmexPrivateEndPoints,
  BitmexRestFetchOrderRequest,
  BitmexRestOrderRequest,
  BitmexRestOrderResponse,
  BitmexRestOrdersResponse,
  RestResponse,
} from '../../types';
import { Rest } from '../rest';

export class Order extends Rest {
  private readonly endpoint = BitmexPrivateEndPoints.Order;

  constructor(config: BitmexConfig) {
    super(config);
  }

  async create(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse> {
    const res = await this.request(HttpMethod.POST, request);

    return {
      ratelimit: res.ratelimit,
      order: <BitmexOrderResponse>res.body,
      error: res.error,
    };
  }

  async fetch(request: Partial<BitmexRestFetchOrderRequest>): Promise<BitmexRestOrdersResponse> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orders: <BitmexOrderResponse[]>res.body,
      error: res.error,
    };
  }

  async update(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse> {
    const res = await this.request(HttpMethod.PUT, request);

    return {
      ratelimit: res.ratelimit,
      order: <BitmexOrderResponse>res.body,
      error: res.error,
    };
  }

  async cancel(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse> {
    const res = await this.request(HttpMethod.DELETE, request);

    return {
      ratelimit: res.ratelimit,
      order: <BitmexOrderResponse>res.body[0],
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
