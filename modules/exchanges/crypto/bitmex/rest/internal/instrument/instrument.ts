import { HttpMethod } from 'dripjs-types';

import { Config, InstrumentResponse, PublicEndPoints, RestInstrumentResponse, RestResponse } from '../../../types';
import { Rest } from '../rest';

export class Instrument extends Rest {
  private readonly endpoint = PublicEndPoints.InstrumentActive;

  constructor(config: Config) {
    super(config);
  }

  async fetch(): Promise<RestInstrumentResponse> {
    const res = await this.request(HttpMethod.GET, {});

    return {
      ratelimit: res.ratelimit,
      instruments: <InstrumentResponse[]>res.body,
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return super.request(method, this.endpoint, data);
  }
}
