import { HttpMethod } from '@dripjs/types';
import { Observable, Subject } from 'rxjs';

import { BarResponse, Config, RestResponse } from '../../../../types';
import { PublicEndPoints } from '../../../constants';
import { RestBarRequest } from '../../../types';
import { RestInsider } from '../../rest-insider';

export class Bar extends RestInsider {
  constructor(config: Config, remaining$: Subject<number>) {
    super(config, PublicEndPoints.TradeBucketed, remaining$);
  }

  fetch(request: RestBarRequest): Observable<RestResponse<BarResponse[]>> {
    return this.request<BarResponse[]>(HttpMethod.GET, request);
  }
}
