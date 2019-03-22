import { isPositive } from 'dripjs-common';

import { testnetConfig } from '../common';
import { BitmexRest } from '../rest';
import { OrderSide, OrderType, TimeInForce, TradeResponse, SettlementResponse } from '../types';
import { BitmexWS } from './bitmex-ws';

const isOrderSide = (side: any) => side === OrderSide.Buy || side === OrderSide.Sell;
const removeDuplicates = (list: any[]): any[] => {
  const uniqueList: any[] = [];
  for (const data of list) {
    if(uniqueList.length === 0) {
      uniqueList.push(data);
    } else {
      const sameData = uniqueList.find((o) => o.pair === data.pair);
      // not has same data
      if (!sameData) {
        uniqueList.push(data);
      }
    }
  }

  return uniqueList;
}

describe('BitmexWS', () => {
  const pair = 'XBTUSD';
  const pair2 = 'ETHUSD';
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
      expect(isOrderSide(trade.side)).toBeTruthy();
      expect(isPositive(trade.amount)).toBeTruthy();
      expect(isPositive(trade.price)).toBeTruthy();
      expect(isPositive(trade.timestamp)).toBeTruthy();
      bitmexWS.stopTrade(pair);
      done();
    });
  });

  it('subscribe multiple trade', async (done) => {
    const receivedMessages: TradeResponse[] = [];
    bitmexWS.trade$([pair, pair2]).subscribe((trade) => {
      receivedMessages.push(trade);
      if (receivedMessages.length === 2) {
        expect(receivedMessages.map((o) => o.symbol)).toEqual([pair, pair2]);
        bitmexWS.stopTrade([pair, pair2]);
        done();
      }
    });
  });

  it('subscribe all trade', async (done) => {
    const receivedMessages: TradeResponse[] = [];
    bitmexWS.trade$().subscribe((trade) => {
      receivedMessages.push(trade);
      if (receivedMessages.length > 5) {
        const list = removeDuplicates(receivedMessages);
        expect(list.length).toBeGreaterThan(2);
        bitmexWS.stopTrade();
        done();
      }
    });
  });

  it('subscribe tradeBin1d', (done) => {
    bitmexWS.tradeBin1d$(pair).subscribe((trade) => {
      // TODO
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
      expect(isPositive(settlement.settledPrice)).toBeTruthy();
      expect(isPositive(settlement.timestamp)).toBeTruthy();
      bitmexWS.stopSettlement(pair);
      done();
    });
  });

  it('subscribe multiple settlement', async (done) => {
    const receivedMessages: SettlementResponse[] = [];
    bitmexWS.settlement$([pair]).subscribe((settlement) => {
      receivedMessages.push(settlement);
      if (receivedMessages.length === 1) {
        expect(receivedMessages.map((o) => o.symbol)).toEqual([pair]);
        bitmexWS.stopSettlement([pair]);
        done();
      }
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
