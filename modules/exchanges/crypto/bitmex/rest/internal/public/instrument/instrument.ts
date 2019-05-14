import { HttpMethod } from '@dripjs/types';

import { Config, InstrumentResponse } from '../../../../types';
import { PublicEndPoints, RestInstrumentResponse } from '../../../types';
import { RestInsider } from '../../rest-insider';

/**
 * 产品更新，包括交易量以及报价
 */
export class Instrument extends RestInsider {
  constructor(config: Config) {
    super(config, PublicEndPoints.InstrumentActive);
  }

  async fetch(): Promise<RestInstrumentResponse> {
    const res = await this.request(HttpMethod.GET, {});

    return {
      ratelimit: res.ratelimit,
      instruments: <InstrumentResponse[]>res.body,
      error: res.error,
    };
  }
}
