import { OrderStatus } from 'dripjs-types';
import * as moment from 'moment';

import { testnetConfig } from '../common';
import {
  BitmexOrderSide,
  BitmexOrderType,
  BitmexResolution,
  BitmexRestFetchOrderRequest,
  BitmexRestOrderRequest,
  BitmexRestOrderbookRequest,
} from '../types';
import { BitmexRest } from './bitmex-rest';

describe('Bitmex Rest', () => {
  const pair = 'XBTUSD';
  const bitmexRest = new BitmexRest(testnetConfig);
  let orderId: string;
  let price: number;

  it('fetch orderbook', async () => {
    const request: BitmexRestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };

    const res = await bitmexRest.fetchOrderbook(request);
    price = +res.orderbook.bids[4][0];
    expect(res.orderbook.bids.length).toEqual(25);
    expect(res.orderbook.asks.length).toEqual(25);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('create order', async () => {
    const request: Partial<BitmexRestOrderRequest> = {
      symbol: pair,
      side: BitmexOrderSide.Buy,
      price,
      orderQty: 25,
      ordType: BitmexOrderType.Limit,
    };

    const res = await bitmexRest.createOrder(request);
    orderId = res.order.orderID;
    expect(res.order).toBeDefined();
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('fetch order', async () => {
    const request: Partial<BitmexRestFetchOrderRequest> = {
      symbol: pair,
      filter: {
        orderID: orderId,
      },
    };

    const res = await bitmexRest.fetchOrder(request);
    expect(res.orders[0].price).toEqual(price);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('update order', async () => {
    const request: Partial<BitmexRestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };

    const res = await bitmexRest.updateOrder(request);
    expect(res.order.price).toEqual(price - 1);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('cancel order', async () => {
    const request: Partial<BitmexRestOrderRequest> = {
      orderID: orderId,
    };
    const res = await bitmexRest.cancelOrder(request);
    expect(res.order.ordStatus).toEqual(OrderStatus.Canceled);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('config is null', async () => {
    const bitmexRest2 = new BitmexRest(<any>{});
    const request: Partial<BitmexRestOrderRequest> = {
      symbol: pair,
      side: BitmexOrderSide.Buy,
      price,
      orderQty: 25,
      ordType: BitmexOrderType.Limit,
    };

    const res = await bitmexRest2.createOrder(request);
    expect(res.error!.name).toEqual('HTTPError');
    expect(res.error!.message).toEqual('Missing API key.');
  });

  it('fetch instrument', async () => {
    const res = await bitmexRest.fetchInstrument();
    expect(res.instruments.length).toBeGreaterThan(0);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('fetch bar', async () => {
    const time = Date.now();
    const res = await bitmexRest.fetchBar({
      symbol: pair,
      binSize: BitmexResolution.day,
      startTime: moment(time - 1000 * 60 * 60 * 24 * 60).toISOString(),
      endTime: moment(time).toISOString(),
    });
    expect(res.bars.length).toEqual(60);
    expect(res.ratelimit.limit).toEqual(300);
  });
});
