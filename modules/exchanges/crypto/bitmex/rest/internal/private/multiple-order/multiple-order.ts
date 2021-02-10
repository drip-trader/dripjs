import { HttpMethod } from '@dripjs/types';
import { Observable, Subject } from 'rxjs';

import { Config, OrderResponse, RestResponse } from '../../../../types';
import { PrivateEndPoints } from '../../../constants';
import { RestCancelMultipleOrderRequest, RestMultipleOrderRequest } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class MultipleOrder extends RestInsider {
  constructor(config: Config, remaining$: Subject<number>) {
    super(config, PrivateEndPoints.OrderBulk, remaining$);
  }

  create(request: RestMultipleOrderRequest): Observable<RestResponse<OrderResponse[]>> {
    return this.request<OrderResponse[]>(HttpMethod.POST, request);
  }

  update(request: RestMultipleOrderRequest): Observable<RestResponse<OrderResponse[]>> {
    return this.request<OrderResponse[]>(HttpMethod.PUT, request);
  }

  cancel(request: Partial<RestCancelMultipleOrderRequest>): Observable<RestResponse<OrderResponse[]>> {
    return this.requestWithEndpoint<OrderResponse[]>(PrivateEndPoints.OrderAll, HttpMethod.DELETE, request);
  }
}
