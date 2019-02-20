// tslint:disable-next-line
require('dotenv').config();

import { OrderStatus } from 'dripjs-types';

import { testnetConfig } from '../common';
import { BitmexRest } from '../rest/bitmex-rest';
import { BitmexOrderSide as OrderSide, OrderType, TimeInForce } from '../types';
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
  it('subscribe order', async (done) => {
    bitmexWS.order$(pair).subscribe((order) => {
      expect(order).toBeDefined();
      expect(order!.ordStatus).toEqual(OrderStatus.New);
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
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
      timeInForce: TimeInForce.Day,
    });
    setTimeout(async () => {
      await bitmexRest.cancelOrder({
        orderID: res.order.orderID,
      });
      done();
    }, 3000);
  });
});
