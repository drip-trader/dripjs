import * as moment from 'moment';

import { testnetConfig } from '../common';
import { receiveOrderData } from '../common/test-helpers';
import { MAX_REMAINING_NUM } from '../constants';
import { ErrorResponse, OrderSide, OrderStatus, OrderType, Resolution } from '../types';
import { Rest } from './rest';
import {
  RestBarResponse,
  RestFetchOrderRequest,
  RestInstrumentResponse,
  RestOrderRequest,
  RestOrderResponse,
  RestOrderbookL2Response,
  RestOrderbookRequest,
  RestOrdersResponse,
} from './types';

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

    const res = (await rest.fetchOrderbook(request)) as RestOrderbookL2Response;
    price = +res.data.bids[4][0];
    expect(res.data.bids.length).toEqual(25);
    expect(res.data.asks.length).toEqual(25);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('create order', async () => {
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    const res = (await rest.createOrder(request)) as RestOrderResponse;
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

    const res = (await rest.fetchOrder(request)) as RestOrdersResponse;
    expect(res.data[0].price).toEqual(price);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('update order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };

    const res = (await rest.updateOrder(request)) as RestOrderResponse;
    expect(res.data.price).toEqual(price - 1);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('cancel order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
    };
    const res = (await rest.cancelOrder(request)) as RestOrdersResponse;
    expect(res.data[0].ordStatus).toEqual(OrderStatus.Canceled);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('get order by id', async () => {
    const res = await receiveOrderData<RestOrdersResponse>(pair, async (order) => {
      price = order.price ? order.price : 0;

      return rest.getOrderById(pair, order.orderID);
    });

    expect(res.data[0].price).toEqual(price);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
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

    const res = (await rest2.createOrder(request)) as ErrorResponse;
    expect(res.error.name).toEqual('HTTPError');
    expect(res.error.message).toEqual('Missing API key.');
  });

  it('fetch instrument', async () => {
    const res = (await rest.fetchInstrument()) as RestInstrumentResponse;
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('fetch bar', async () => {
    const time = Date.now();
    const res = (await rest.fetchBar({
      symbol: pair,
      binSize: Resolution.day,
      startTime: moment(time - 1000 * 60 * 60 * 24 * 60).toISOString(),
      endTime: moment(time).toISOString(),
    })) as RestBarResponse;
    expect(res.data.length).toEqual(60);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });
});
