import { BitmexWS } from './bitmex-ws';

describe('BitmexWS', () => {
  const pair = 'XBTUSD';
  const bitmexWS = new BitmexWS({
    apiKey: 'xcWx4ts3A5sluYBupjvvNAnO',
    apiSecret: 'rpeJNuMp-8uAJTae6UUed2kyt-bGfGIGQ_Rh033TFuhheK4l',
    testnet: true,
  });
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
