import { HttpMethod } from 'dripjs-types';

import { BitmexConfig, BitmexInstrumentResponse, BitmexPublicEndPoints, BitmexRestInstrumentResponse, RestResponse } from '../../../types';
import { Rest } from '../rest';

export class Instrument extends Rest {
  private readonly endpoint = BitmexPublicEndPoints.InstrumentActive;

  constructor(config: BitmexConfig) {
    super(config);
  }

  async fetch(): Promise<BitmexRestInstrumentResponse> {
    const res = await this.request(HttpMethod.GET, {});

    return {
      ratelimit: res.ratelimit,
      instruments: <BitmexInstrumentResponse[]>res.body,
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
