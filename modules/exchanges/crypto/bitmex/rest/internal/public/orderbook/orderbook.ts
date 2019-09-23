import { HttpMethod } from '@dripjs/types';

import { Config, ErrorResponse, OrderbookResponse } from '../../../../types';
import { RestOrderbookL2Response, RestOrderbookRequest, RestPublicEndPoints } from '../../../types';
import { makeResultByHandle } from '../../function';
import { RestInsider } from '../../rest-insider';
import { transform } from './helpers';

export class Orderbook extends RestInsider {
  constructor(config: Config) {
    super(config, RestPublicEndPoints.OrderBookL2);
  }

  async fetch(request: RestOrderbookRequest): Promise<RestOrderbookL2Response | ErrorResponse> {
    const res = await this.request<OrderbookResponse[]>(HttpMethod.GET, request);

    return makeResultByHandle(res, transform);
  }
}
