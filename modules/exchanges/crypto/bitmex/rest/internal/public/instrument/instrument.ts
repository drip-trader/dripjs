import { HttpMethod } from '@dripjs/types';

import { Config, ErrorResponse, InstrumentResponse } from '../../../../types';
import { RestInstrumentResponse, RestPublicEndPoints } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class Instrument extends RestInsider {
  constructor(config: Config) {
    super(config, RestPublicEndPoints.InstrumentActive);
  }

  async fetch(): Promise<RestInstrumentResponse | ErrorResponse> {
    return this.request<InstrumentResponse[]>(HttpMethod.GET, {});
  }
}
