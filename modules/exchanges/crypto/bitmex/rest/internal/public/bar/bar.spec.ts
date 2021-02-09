import { testnetConfig } from '@dripjs/testing';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Resolution } from '../../../../types';
import { MAX_REMAINING_NUM } from '../../../constants';
import { Bar } from './bar';

import moment = require('moment');

describe('Bitmex Rest Bar', () => {
  const remaining$ = new Subject<number>();
  const bar = new Bar(testnetConfig, remaining$);

  it('fetch instrument', async () => {
    const res = await bar
      .fetch({
        binSize: Resolution.day,
        symbol: 'XBTUSD',
      })
      .toPromise();
    expect(res.data.length).toEqual(100);
    expect(res.rateLimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('should cancel request', (done) => {
    const sub$ = new Subject<void>();
    sub$
      .pipe(
        tap((n) => console.log(`run at: ${moment()}`)),
        switchMap(() =>
          bar.fetch({
            binSize: Resolution.day,
            symbol: 'XBTUSD',
          }),
        ),
      )
      .subscribe((res) => {
        console.log(res.rateLimit);
        done();
      });
    sub$.next();
    sub$.next();
    sub$.next();
    sub$.next();
    sub$.next();
    sub$.next();
  });
});
