import { HttpMethod } from '@dripjs/types';

import { BarResponse, Config, ErrorResponse } from '../../../../types';
import { RestBarRequest, RestBarResponse, RestPublicEndPoints } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class Bar extends RestInsider {
  constructor(config: Config) {
    super(config, RestPublicEndPoints.TradeBucketed);
  }

  async fetch(request: RestBarRequest): Promise<RestBarResponse | ErrorResponse> {
    return this.request<BarResponse[]>(HttpMethod.GET, request);
  }
}
