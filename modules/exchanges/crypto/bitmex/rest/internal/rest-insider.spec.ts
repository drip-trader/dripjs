import { testnetConfig } from '@dripjs/testing';
import { HttpMethod } from '@dripjs/types';
import { Subject } from 'rxjs';

import { PrivateEndPoints } from '../constants';
import { RestInsider } from './rest-insider';

describe('RestInsider', () => {
  let restInsider: RestInsider;
  const remaining$ = new Subject<number>();

  beforeAll(() => {
    restInsider = new RestInsider(testnetConfig, PrivateEndPoints.Quote, remaining$);
  });

  it('should request', async () => {
    const res = await restInsider.request<any>(HttpMethod.GET, { symbol: 'XBTUSD' }).toPromise();
    expect(res).toBeDefined();
  });
});
