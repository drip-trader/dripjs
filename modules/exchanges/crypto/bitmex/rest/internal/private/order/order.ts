import { HttpMethod } from '@dripjs/types';

import { Config, ErrorResponse, OrderResponse } from '../../../../types';
import { RestFetchOrderRequest, RestOrderRequest, RestOrderResponse, RestOrdersResponse, RestPrivateEndPoints } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class Order extends RestInsider {
  constructor(config: Config) {
    super(config, RestPrivateEndPoints.Order);
  }

  async create(request: Partial<RestOrderRequest>): Promise<RestOrderResponse | ErrorResponse> {
    return this.request<OrderResponse>(HttpMethod.POST, request);
  }

  async fetch(request: Partial<RestFetchOrderRequest>): Promise<RestOrdersResponse | ErrorResponse> {
    return this.request<OrderResponse[]>(HttpMethod.GET, request);
  }

  async update(request: Partial<RestOrderRequest>): Promise<RestOrderResponse | ErrorResponse> {
    return this.request<OrderResponse>(HttpMethod.PUT, request);
  }

  async cancel(request: Partial<RestOrderRequest>): Promise<RestOrdersResponse | ErrorResponse> {
    return this.request<OrderResponse[]>(HttpMethod.DELETE, request);
  }
}
