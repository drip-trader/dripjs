import { testnetConfig } from '../../../../common';
import { ResponseType } from '../../../../types';
import { RestOrderbookL2Response, RestOrderbookRequest } from '../../../types';
import { Orderbook } from './orderbook';

describe('Bitmex Rest Orderbook', () => {
  const pair = 'XBTUSD';
  const orderbook = new Orderbook(testnetConfig);
  it('fetch orderbook', async () => {
    const request: RestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };

    const res = (await orderbook.fetch(request)) as RestOrderbookL2Response;
    expect(res.type).toEqual(ResponseType.Rest);
    expect(res.data.bids.length).toEqual(25);
    expect(res.data.asks.length).toEqual(25);
    expect(res.ratelimit.limit).toEqual(60);
  });
});
