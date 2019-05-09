import { isPositive } from 'dripjs-common';

import { testnetConfig } from '../common';
import { BitmexRest } from '../rest';
import {
  OrderSide,
  OrderType,
  TimeInForce,
  TradeResponse,
  SettlementResponse,
  OrderResponse,
  RestOrderRequest,
  OrderbookL2Response,
} from '../types';
import { BitmexWS } from './bitmex-ws';
import { OrderStatus } from 'dripjs-types';
import { sleep } from '@dripjs/common';

// check value with order isde
const isOrderSide = (side: any) => side === OrderSide.Buy || side === OrderSide.Sell;

// get unique list by pair
const removeDuplicates = (list: TradeResponse[]): TradeResponse[] => {
  const uniqueList: any[] = [];
  for (const data of list) {
    if (uniqueList.length === 0) {
      uniqueList.push(data);
    } else {
      const sameData = uniqueList.find((o) => o.symbol === data.symbol);
      // not has same data
      if (!sameData) {
        uniqueList.push(data);
      }
    }
  }

  return uniqueList;
};

// chedck uuid
const isUuid = (v: any) => v.length === 36;

describe('BitmexWS', () => {
  const pair = 'XBTUSD';
  const pair2 = 'ETHUSD';
  const bitmexWS = new BitmexWS(testnetConfig);
  afterAll(() => {
    bitmexWS.destroy();
  });

  it('subscribe orderbook', async () => {
    let receiveData: OrderbookL2Response;
    bitmexWS.orderbook$(pair).subscribe((orderbook) => {
      receiveData = orderbook;
    });
    await sleep(5000);
    expect(receiveData.asks.length).toBeGreaterThan(0);
    expect(receiveData.bids.length).toBeGreaterThan(0);
    bitmexWS.stopOrderbook(pair);
  });

  describe('subscribe trade', () => {
    it('subscribe single trade', (done) => {
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

  describe.only('subscribe order', () => {
    const newOrder = {
      symbol: pair,
      side: OrderSide.Buy,
      price: 0,
      orderQty: 25,
      ordType: OrderType.Limit,
      timeInForce: TimeInForce.Day,
    };
    const newOrder2 = {
      ...newOrder,
      symbol: pair2,
    };
    const checkOrder = (snapshot: Partial<RestOrderRequest>, order: OrderResponse) => {
      expect(isUuid(order.orderID)).toBeTruthy();
      expect(isPositive(String(order.account))).toBeTruthy();
      expect(order.side).toEqual(snapshot.side);
      expect(order.price).toEqual(snapshot.price);
      expect(order.orderQty).toEqual(snapshot.orderQty);
      expect(order.ordType).toEqual(snapshot.ordType);
      expect(order.timeInForce).toEqual(snapshot.timeInForce);
      expect(order.ordStatus).toEqual(OrderStatus.New);
    };

    it('subscribe single order', async (done) => {
      const bitmexRest = new BitmexRest(testnetConfig);
      const orderbookRes = await bitmexRest.fetchOrderbook({
        symbol: pair,
        depth: 5,
      });
      newOrder.price = +orderbookRes.orderbook.bids[4][0];
      bitmexWS.order$(pair).subscribe(async (order) => {
        checkOrder(newOrder, order);
        bitmexWS.stopOrder(pair);
        await bitmexRest.cancelOrder({
          orderID: order.orderID,
        });
        done();
      });
      await bitmexRest.createOrder(newOrder);
    });

    it('subscribe multiple order', async (done) => {
      const bitmexRest = new BitmexRest(testnetConfig);
      const orderbookRes = await bitmexRest.fetchOrderbook({
        symbol: pair,
        depth: 5,
      });
      newOrder.price = +orderbookRes.orderbook.bids[4][0];

      const orderbookRes2 = await bitmexRest.fetchOrderbook({
        symbol: pair2,
        depth: 5,
      });
      newOrder2.price = +orderbookRes2.orderbook.bids[4][0];

      const receivedMessages: OrderResponse[] = [];
      bitmexWS.order$([pair, pair2]).subscribe(async (order) => {
        receivedMessages.push(order);
        if (receivedMessages.length === 2) {
          bitmexWS.stopOrder([pair, pair2]);
          for (const msg of receivedMessages) {
            const snapshot = msg.symbol === newOrder.symbol ? newOrder : newOrder2;
            checkOrder(snapshot, msg);
            await bitmexRest.cancelOrder({
              orderID: msg.orderID,
            });
          }
          done();
        }
      });
      await Promise.all([bitmexRest.createOrder(newOrder), bitmexRest.createOrder(newOrder2)]);
    });

    it.only('subscribe all order', async (done) => {
      const bitmexRest = new BitmexRest(testnetConfig);
      const orderbookRes = await bitmexRest.fetchOrderbook({
        symbol: pair,
        depth: 5,
      });
      newOrder.price = +orderbookRes.orderbook.bids[4][0];

      const orderbookRes2 = await bitmexRest.fetchOrderbook({
        symbol: pair2,
        depth: 5,
      });
      newOrder2.price = +orderbookRes2.orderbook.bids[4][0];

      const receivedMessages: OrderResponse[] = [];
      bitmexWS.order$().subscribe(async (order) => {
        receivedMessages.push(order);
        if (receivedMessages.length === 2) {
          bitmexWS.stopOrder();
          for (const msg of receivedMessages) {
            const snapshot = msg.symbol === newOrder.symbol ? newOrder : newOrder2;
            checkOrder(snapshot, msg);
            await bitmexRest.cancelOrder({
              orderID: msg.orderID,
            });
          }
          done();
        }
      });
      await Promise.all([bitmexRest.createOrder(newOrder), bitmexRest.createOrder(newOrder2)]);
    });
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
