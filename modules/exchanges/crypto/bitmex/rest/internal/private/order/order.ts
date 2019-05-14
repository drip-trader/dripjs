import { HttpMethod } from '@dripjs/types';

import { Config, OrderResponse } from '../../../../types';
import { PrivateEndPoints, RestFetchOrderRequest, RestOrderRequest, RestOrderResponse, RestOrdersResponse } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class Order extends RestInsider {
  constructor(config: Config) {
    super(config, PrivateEndPoints.Order);
  }

  async create(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    const res = await this.request(HttpMethod.POST, request);

    return {
      ratelimit: res.ratelimit,
      order: <OrderResponse>res.body,
      error: res.error,
    };
  }

  async fetch(request: Partial<RestFetchOrderRequest>): Promise<RestOrdersResponse> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orders: <OrderResponse[]>res.body,
      error: res.error,
    };
  }

  async update(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    const res = await this.request(HttpMethod.PUT, request);

    return {
      ratelimit: res.ratelimit,
      order: <OrderResponse>res.body,
      error: res.error,
    };
  }

  async cancel(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    const res = await this.request(HttpMethod.DELETE, request);

    return {
      ratelimit: res.ratelimit,
      order: <OrderResponse>res.body[0],
      error: res.error,
    };
  }
}
