import { testnetConfig } from '../common';
import { BitmexRest } from '../rest/bitmex-rest';
import { BitmexOrderSide, BitmexOrderType, BitmexTimeInForce } from '../types';
import { BitmexWS } from './bitmex-ws';

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
    });
    setTimeout(() => {
      bitmexWS.stopOrderbook(pair);
      done();
    }, 5000);
  });
  it('subscribe trade', (done) => {
    bitmexWS.trade$(pair).subscribe((trade) => {
      expect(trade).toBeDefined();
      bitmexWS.stopTrade(pair);
      done();
    });
  });
  it('subscribe tradeBin1d', (done) => {
    bitmexWS.tradeBin1d$(pair).subscribe((trade) => {
      expect(trade).toBeDefined();
    });
    setTimeout(() => {
      bitmexWS.stopTradeBin1d(pair);
      done();
    }, 1000);
  });
  it('subscribe quote', (done) => {
    bitmexWS.quote$(pair).subscribe((quote) => {
      expect(quote).toBeDefined();
      bitmexWS.stopQuote(pair);
      done();
    });
  });
  it('subscribe settlement', (done) => {
    bitmexWS.settlement$(pair).subscribe((settlement) => {
      expect(settlement).toBeDefined();
      bitmexWS.stopSettlement(pair);
      done();
    });
  });
  it('subscribe order', async (done) => {
    bitmexWS.order$(pair).subscribe((order) => {
      expect(order).toBeDefined();
      bitmexWS.stopOrder(pair);
    });
    const bitmexRest = new BitmexRest(testnetConfig);
    const orderbookRes = await bitmexRest.fetchOrderbook({
      symbol: pair,
      depth: 5,
    });
    const price = +orderbookRes.orderbook.bids[4][0];
    const res = await bitmexRest.createOrder({
      symbol: pair,
      side: BitmexOrderSide.Buy,
      price,
      orderQty: 25,
      ordType: BitmexOrderType.Limit,
      timeInForce: BitmexTimeInForce.Day,
    });
    setTimeout(async () => {
      await bitmexRest.cancelOrder({
        orderID: res.order.orderID,
      });
      done();
    }, 3000);
  });
  it('config is null', (done) => {
    const bitmexWS2 = new BitmexWS(<any>{});
    bitmexWS2.quote$(pair).subscribe((quote) => {
      expect(quote).toBeDefined();
      bitmexWS2.stopQuote(pair);
      bitmexWS2.destroy();
      done();
    });
  });
});
