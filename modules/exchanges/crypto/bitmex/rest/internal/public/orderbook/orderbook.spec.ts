import { testnetReadonlyConfig } from '@dripjs/testing';

import { RestOrderbookRequest } from '../../../types';
import { Orderbook } from './orderbook';

describe.skip('Bitmex RestInsider Orderbook', () => {
  const pair = 'XBTUSD';
  const orderbook = new Orderbook(testnetReadonlyConfig);
  it('fetch orderbook', async () => {
    const request: RestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };

    const res = await orderbook.fetch(request);
    expect(res.orderbook.bids.length).toEqual(25);
    expect(res.orderbook.asks.length).toEqual(25);
    expect(res.ratelimit.limit).toEqual(300);
  });
});
