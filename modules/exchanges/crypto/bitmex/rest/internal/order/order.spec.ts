import { OrderStatus } from 'dripjs-types';

import { testnetConfig, testnetReadonlyConfig } from '../../../common';
import { BitmexOrderSide, BitmexOrderType, BitmexRestFetchOrderRequest, BitmexRestOrderRequest } from '../../../types';
import { Orderbook } from '../orderbook';
import { Order } from './order';

describe.skip('Bitmex Rest Order', () => {
  const pair = 'XBTUSD';
  const order = new Order(testnetConfig);
  const orderbook = new Orderbook(testnetReadonlyConfig);
  let orderId: string;
  let price: number;

  it('create order', async () => {
    const orderbookRes = await orderbook.fetch({
      symbol: pair,
      depth: 5,
    });
    price = +orderbookRes.orderbook.bids[4][0];
    const request: Partial<BitmexRestOrderRequest> = {
      symbol: pair,
      side: BitmexOrderSide.Buy,
      price,
      orderQty: 25,
      ordType: BitmexOrderType.Limit,
    };

    const res = await order.create(request);
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

    const res = await order.fetch(request);
    expect(res.orders[0].price).toEqual(price);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('update order', async () => {
    const request: Partial<BitmexRestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };

    const res = await order.update(request);
    expect(res.order.price).toEqual(price - 1);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('cancel order', async () => {
    const request: Partial<BitmexRestOrderRequest> = {
      orderID: orderId,
    };
    const res = await order.cancel(request);
    expect(res.order.ordStatus).toEqual(OrderStatus.Canceled);
    expect(res.ratelimit.limit).toEqual(300);
  });
});
