import { testnetReadonlyConfig } from '@dripjs/testing';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RestOrderbookRequest } from '../../../types';
import { Orderbook } from './orderbook';

describe.skip('Bitmex RestInsider Orderbook', () => {
  const remaining$ = new Subject<number>();
  const pair = 'XBTUSD';
  const orderbook = new Orderbook(testnetReadonlyConfig, remaining$);
  it('fetch orderbook', (done) => {
    const request: RestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };
    console.log({
      data: request,
      event: '查询订单薄',
    });
    orderbook
      .fetch(request)
      .pipe(
        tap((res) => {
          console.log({
            data: JSON.stringify(res),
            event: '查询订单薄-结果',
          });
        }),
      )
      .subscribe((res) => {
        expect(res.data.bids.length).toEqual(25);
        expect(res.data.asks.length).toEqual(25);
        expect(res.rateLimit.limit).toEqual(60);
        done();
      });
  });
});
