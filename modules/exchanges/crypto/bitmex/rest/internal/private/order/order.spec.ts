import { isPositive } from '@dripjs/common';
import {
  assertExisitingColumns,
  isUuid,
  overrideTimestampColumns,
  overrideValue,
  testnetConfig,
  testnetReadonlyConfig,
} from '@dripjs/testing';

import { OrderSide, OrderStatus, OrderType } from '../../../../types';
import { RestFetchOrderRequest, RestOrderRequest } from '../../../types';
import { Orderbook } from '../../public/orderbook';
import { Order } from './order';

describe('Bitmex RestInsider Order', () => {
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
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    const res = await order.create(request);
    orderId = res.order.orderID;
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: isPositive,
        },
        order: {
          orderID: isUuid,
          account: isPositive,
          symbol: 'XBTUSD',
          side: 'Buy',
          simpleOrderQty: null,
          orderQty: 25,
          price: isPositive,
          displayQty: null,
          stopPx: null,
          pegOffsetValue: null,
          pegPriceType: '',
          currency: 'USD',
          settlCurrency: 'XBt',
          ordType: 'Limit',
          timeInForce: 'GoodTillCancel',
          execInst: '',
          contingencyType: '',
          exDestination: 'XBME',
          ordStatus: 'New',
          triggered: '',
          workingIndicator: true,
          ordRejReason: '',
          simpleLeavesQty: null,
          leavesQty: 25,
          simpleCumQty: null,
          cumQty: 0,
          avgPx: null,
          multiLegReportingType: 'SingleSecurity',
          text: 'Submitted via API.',
          transactTime: overrideValue,
          timestamp: overrideValue,
        },
      }),
    ).not.toThrow();
  });

  it('fetch order', async () => {
    const request: Partial<RestFetchOrderRequest> = {
      symbol: pair,
      filter: {
        orderID: orderId,
      },
    };

    const res = await order.fetch(request);
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: isPositive,
        },
        orders: [
          {
            orderID: isUuid,
            clOrdID: '',
            clOrdLinkID: '',
            account: isPositive,
            symbol: 'XBTUSD',
            side: 'Buy',
            simpleOrderQty: null,
            orderQty: 25,
            price,
            displayQty: null,
            stopPx: null,
            pegOffsetValue: null,
            pegPriceType: '',
            currency: 'USD',
            settlCurrency: 'XBt',
            ordType: 'Limit',
            timeInForce: 'GoodTillCancel',
            execInst: '',
            contingencyType: '',
            exDestination: 'XBME',
            ordStatus: 'New',
            triggered: '',
            workingIndicator: true,
            ordRejReason: '',
            simpleLeavesQty: null,
            leavesQty: 25,
            simpleCumQty: null,
            cumQty: 0,
            avgPx: null,
            multiLegReportingType: 'SingleSecurity',
            text: 'Submitted via API.',
            transactTime: overrideValue,
            timestamp: overrideValue,
          },
        ],
      }),
    ).not.toThrow();
  });

  it('update order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };

    const res = await order.update(request);
    expect(res.order.price).toEqual(price - 1);
  });

  it('cancel order', async () => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
    };
    const res = await order.cancel(request);
    expect(res.order.ordStatus).toEqual(OrderStatus.Canceled);
  });
});
