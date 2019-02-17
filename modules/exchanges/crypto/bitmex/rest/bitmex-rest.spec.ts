import { testnetConfig } from '@dripjs/testing';

import { FetchOrderRequest, OrderRequest, OrderSide, OrderStatus, OrderType, OrderbookRequest } from '../types';
import { BitmexRest } from './bitmex-rest';

describe('Bitmex Rest', () => {
  const pair = 'XBTUSD';
  const bitmexRest = new BitmexRest(testnetConfig);
  let orderId: string;
  let price: number;

  it('fetch orderbook', async () => {
    const request: OrderbookRequest = {
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
    const request: Partial<OrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    const res = await bitmexRest.createOrder(request);
    orderId = res.order.orderID;
    expect(res.order).toBeDefined();
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('fetch order', async () => {
    const request: Partial<FetchOrderRequest> = {
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
    const request: Partial<OrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };

    const res = await bitmexRest.updateOrder(request);
    expect(res.order.price).toEqual(price - 1);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('cancel order', async () => {
    const request: Partial<OrderRequest> = {
      orderID: orderId,
    };
    const res = await bitmexRest.cancelOrder(request);
    expect(res.order.ordStatus).toEqual(OrderStatus.Canceled);
    expect(res.ratelimit.limit).toEqual(300);
  });
});
