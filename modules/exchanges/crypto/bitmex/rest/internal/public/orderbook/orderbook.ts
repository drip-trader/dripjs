import { HttpMethod } from '@dripjs/types';

import { Config, OrderbookResponse } from '../../../../types';
import { PublicEndPoints, RestOrderbookL2Response, RestOrderbookRequest } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { transform } from './helpers';

export class Orderbook extends RestInsider {
  constructor(config: Config) {
    super(config, PublicEndPoints.OrderBookL2);
  }

  async fetch(request: RestOrderbookRequest): Promise<RestOrderbookL2Response> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orderbook: transform(<OrderbookResponse[]>res.body),
      error: res.error,
    };
  }
}
