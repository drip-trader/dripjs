import { BitmexWS } from './bitmex-ws';

describe('BitmexWS', () => {
  const pair = 'XBTUSD';
  let bitmexWS = new BitmexWS({
    apiKey: 'xcWx4ts3A5sluYBupjvvNAnO',
    apiSecret: 'rpeJNuMp-8uAJTae6UUed2kyt-bGfGIGQ_Rh033TFuhheK4l',
    testnet: true,
  });
  it('get orderbook', (done) => {
    bitmexWS.orderbook$(pair).subscribe((orderbook) => {
      // console.log(orderbook);
      expect(orderbook.asks.length).toBeGreaterThan(0);
      expect(orderbook.bids.length).toBeGreaterThan(0);
      bitmexWS.stopOrderbook(pair);
      done();
    });
  });
});
