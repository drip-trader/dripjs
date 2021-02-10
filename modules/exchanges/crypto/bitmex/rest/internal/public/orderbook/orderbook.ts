import { HttpMethod } from '@dripjs/types';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Config, OrderbookL2Response, OrderbookResponse, RestResponse } from '../../../../types';
import { PublicEndPoints } from '../../../constants';
import { RestOrderbookRequest } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { transform } from './helpers';

export class Orderbook extends RestInsider {
  constructor(config: Config, remaining$: Subject<number>) {
    super(config, PublicEndPoints.OrderBookL2, remaining$);
  }

  fetch(request: RestOrderbookRequest): Observable<RestResponse<OrderbookL2Response>> {
    return this.request<OrderbookResponse[]>(HttpMethod.GET, request).pipe(map(transform));
  }
}
