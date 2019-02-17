import { Intelligence } from '../intelligence';

describe('Intelligence', () => {
  const pair = 'XBTUSD';
  const intelligence = new Intelligence();
  it('get orderbook', async () => {
    const res = await intelligence.getOrderbook(pair);
    expect(res.orderbook.bids.length).toEqual(25);
    expect(res.orderbook.asks.length).toEqual(25);
    expect(res.ratelimit.limit).toEqual(300);
  });
});
