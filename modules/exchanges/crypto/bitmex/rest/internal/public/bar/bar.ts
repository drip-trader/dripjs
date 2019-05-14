import { HttpMethod } from '@dripjs/types';

import { BarResponse, Config } from '../../../../types';
import { PublicEndPoints, RestBarRequest, RestBarResponse } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class Bar extends RestInsider {
  constructor(config: Config) {
    super(config, PublicEndPoints.TradeBucketed);
  }

  async fetch(request: RestBarRequest): Promise<RestBarResponse> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      bars: <BarResponse[]>res.body,
      error: res.error,
    };
  }
}
