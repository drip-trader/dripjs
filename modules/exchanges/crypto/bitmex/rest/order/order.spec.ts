import { OrderRequest, OrderSide, OrderType } from '../../types';
import { Order } from './order';
import { testnetConfig } from '@drip/testing';

describe('Bitmex Rest Order', () => {
  const pair = 'XBTUSD';
  const order = new Order(testnetConfig);
  it.skip('create order', async () => {
    const request: Partial<OrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    const res = await order.create(request);
    expect(res.order).toBeDefined();
    expect(res.ratelimit.limit).toEqual(300);
  });
});
