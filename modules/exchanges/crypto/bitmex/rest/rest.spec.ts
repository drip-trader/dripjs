import { corsProxy, testnetConfig } from '@dripjs/testing';
import * as moment from 'moment';

import { receiveOrderData } from '../common/test-helpers';
import { OrderSide, OrderStatus, OrderType, Resolution } from '../types';
import { Rest } from './rest';
import { RestFetchOrderRequest, RestOrderRequest, RestOrderbookRequest, RestOrdersResponse } from './types';

describe('Bitmex Rest', () => {
  const pair = 'XBTUSD';
  const rest = new Rest(testnetConfig);
  let orderId: string;
  let price: number;

  it('fetch orderbook', async () => {
    const request: RestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };

    const res = await rest.fetchOrderbook(request);
    price = +res.orderbook.bids[4][0];
    expect(res.orderbook.bids.length).toEqual(25);
    expect(res.orderbook.asks.length).toEqual(25);
  });

  it('fetch orderbook for proxy', async () => {
    const restProxy = new Rest({ ...testnetConfig, corsProxy });

    const request: RestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };
    const res = await restProxy.fetchOrderbook(request);
    expect(res.orderbook.bids.length).toEqual(25);
    expect(res.orderbook.asks.length).toEqual(25);
  });

  it('create order', async () => {
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    const res = await rest.createOrder(request);
    orderId = res.order.orderID;
    expect(res.order).toBeDefined();
  });

  it('fetch order', async () => {
    const request: Partial<RestFetchOrderRequest> = {
      symbol: pair,
      filter: {
        orderID: orderId,
      },
    };

    const res = await rest.fetchOrder(request);
    expect(res.orders[0].price).toEqual(price);
  });

  it('update order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };

    const res = await rest.updateOrder(request);
    expect(res.order.price).toEqual(price - 1);
  });

  it('cancel order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
    };
    const res = await rest.cancelOrder(request);
    expect(res.order.ordStatus).toEqual(OrderStatus.Canceled);
  });

  it('get order by id', async () => {
    const res = await receiveOrderData<RestOrdersResponse>(pair, async (order) => {
      price = order.price ? order.price : 0;

      return rest.getOrderById(pair, order.orderID);
    });

    expect(res.orders[0].price).toEqual(price);
  });

  it('config is null', async () => {
    const rest2 = new Rest(<any>{});
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    const res = await rest2.createOrder(request);
    expect(res.error!.name).toEqual('HTTPError');
    expect(res.error!.message).toEqual('Missing API key.');
  });

  it('fetch instrument', async () => {
    const res = await rest.fetchInstrument();
    expect(res.instruments.length).toBeGreaterThan(0);
  });

  it('fetch bar', async () => {
    const time = Date.now();
    const res = await rest.fetchBar({
      symbol: pair,
      binSize: Resolution.day,
      startTime: moment(time - 1000 * 60 * 60 * 24 * 60).toISOString(),
      endTime: moment(time).toISOString(),
    });
    expect(res.bars.length).toEqual(60);
  });
});
