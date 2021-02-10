import { HttpMethod } from '@dripjs/types';
import { Observable, Subject } from 'rxjs';

import { Config, OrderResponse, RestResponse } from '../../../../types';
import { PrivateEndPoints } from '../../../constants';
import { RestFetchOrderRequest, RestOrderRequest } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class Order extends RestInsider {
  constructor(config: Config, remaining$: Subject<number>) {
    super(config, PrivateEndPoints.Order, remaining$);
  }

  create(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.request<OrderResponse>(HttpMethod.POST, request);
  }

  fetch(request: Partial<RestFetchOrderRequest>): Observable<RestResponse<OrderResponse[]>> {
    return this.request<OrderResponse[]>(HttpMethod.GET, request);
  }

  update(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.request<OrderResponse>(HttpMethod.PUT, request);
  }

  cancel(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse[]>> {
    return this.request<OrderResponse[]>(HttpMethod.DELETE, request);
  }
}
