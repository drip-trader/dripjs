import { HttpMethod } from '@dripjs/types';
import { Observable, Subject } from 'rxjs';

import { Config, InstrumentResponse, RestResponse } from '../../../../types';
import { PublicEndPoints } from '../../../constants';
import { RestInsider } from '../../rest-insider';

/**
 * 产品更新，包括交易量以及报价
 */
export class Instrument extends RestInsider {
  constructor(config: Config, remaining$: Subject<number>) {
    super(config, PublicEndPoints.InstrumentActive, remaining$);
  }

  fetch(): Observable<RestResponse<InstrumentResponse[]>> {
    return this.request<InstrumentResponse[]>(HttpMethod.GET, {});
  }
}
