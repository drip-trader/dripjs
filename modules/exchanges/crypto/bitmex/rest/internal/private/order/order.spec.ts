import { testnetConfig } from '../../../../common';
import { MAX_REMAINING_NUM } from '../../../../constants';
import { OrderSide, OrderStatus, OrderType } from '../../../../types';
import { RestFetchOrderRequest, RestOrderRequest, RestOrderResponse, RestOrderbookL2Response, RestOrdersResponse } from '../../../types';
import { Orderbook } from '../../public/orderbook';
import { Order } from './order';

describe('Bitmex Rest Position', () => {
  const pair = 'XBTUSD';
  const order = new Order(testnetConfig);
  const orderbook = new Orderbook(testnetConfig);
  let orderId: string;
  let price: number;

  it('create order', async () => {
    const orderbookRes = (await orderbook.fetch({
      symbol: pair,
      depth: 5,
    })) as RestOrderbookL2Response;
    price = +orderbookRes.data.bids[4][0];
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    const res = (await order.create(request)) as RestOrderResponse;
    orderId = res.data.orderID;
    expect(res.data).toBeDefined();
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('fetch order', async () => {
    const request: Partial<RestFetchOrderRequest> = {
      symbol: pair,
      filter: {
        orderID: orderId,
      },
    };

    const res = (await order.fetch(request)) as RestOrdersResponse;
    expect(res.data[0].price).toEqual(price);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('update order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };

    const res = (await order.update(request)) as RestOrderResponse;
    expect(res.data.price).toEqual(price - 1);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('cancel order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
    };
    const res = (await order.cancel(request)) as RestOrdersResponse;
    expect(res.data[0].ordStatus).toEqual(OrderStatus.Canceled);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });
});
