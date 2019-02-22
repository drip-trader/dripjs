import { HttpMethod } from 'dripjs-types';

import {
  Config,
  FetchOrderRequest,
  OrderRequest,
  OrderResponse,
  PrivateEndPoints,
  RestOrderResponse,
  RestOrdersResponse,
  RestResponse,
} from '../../types';
import { Rest } from '../rest';

export class Order extends Rest {
  private readonly endpoint = PrivateEndPoints.Order;

  constructor(config: Config) {
    super(config);
  }

  async create(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    const res = await this.request(HttpMethod.POST, request);

    return {
      ratelimit: res.ratelimit,
      order: <OrderResponse>res.body,
      error: res.error,
    };
  }

  async fetch(request: Partial<FetchOrderRequest>): Promise<RestOrdersResponse> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orders: <OrderResponse[]>res.body,
      error: res.error,
    };
  }

  async update(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    const res = await this.request(HttpMethod.PUT, request);

    return {
      ratelimit: res.ratelimit,
      order: <OrderResponse>res.body,
      error: res.error,
    };
  }

  async cancel(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    const res = await this.request(HttpMethod.DELETE, request);

    return {
      ratelimit: res.ratelimit,
      order: <OrderResponse>res.body[0],
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
