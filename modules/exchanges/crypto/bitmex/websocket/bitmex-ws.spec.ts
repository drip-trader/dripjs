import { BitmexWS } from './bitmex-ws';
import { testnetConfig } from '@drip/testing';

describe('BitmexWS', () => {
  const pair = 'XBTUSD';
  const bitmexWS = new BitmexWS(testnetConfig);
  afterAll(() => {
    bitmexWS.destroy();
  });
  it('subscribe orderbook', (done) => {
    bitmexWS.orderbook$(pair).subscribe((orderbook) => {
      expect(orderbook.asks.length).toBeGreaterThan(0);
      expect(orderbook.bids.length).toBeGreaterThan(0);
      bitmexWS.stopOrderbook(pair);
      done();
    });
  });
  it('subscribe trade', (done) => {
    bitmexWS.trade$(pair).subscribe((trade) => {
      expect(trade).toBeDefined();
      bitmexWS.stopTrade(pair);
      done();
    });
  });
  it.skip('subscribe order', (done) => {
    bitmexWS.order$(pair).subscribe((order) => {
      expect(order).toBeDefined();
      bitmexWS.stopOrderbook(pair);
      done();
    });
  });
});
