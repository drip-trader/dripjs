import { isPositive } from '@dripjs/common';
import { corsProxy, testnetConfig } from '@dripjs/testing';
import * as moment from 'moment';

import { assertExisitingColumns, isUuid, overrideTimestampColumns, overrideValue } from '../common/test-helpers';
import { OrderResponse, OrderSide, OrderStatus, OrderType, Resolution } from '../types';
import { Rest } from './rest';
import { RestFetchOrderRequest, RestOrderRequest, RestOrderbookRequest } from './types';

describe('Bitmex Rest', () => {
  const pair = 'XBTUSD';
  const rest = new Rest(testnetConfig);
  afterAll(async () => {
    await rest.removePosition(pair);
  });

  it('fetch orderbook', async () => {
    const request: RestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };

    const res = await rest.fetchOrderbook(request);
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

  describe('create order', () => {
    let price: number;
    let orderID: string;
    beforeAll(async () => {
      const request: RestOrderbookRequest = {
        symbol: pair,
        depth: 25,
      };
      const res = await rest.fetchOrderbook(request);
      price = +res.orderbook.bids[4][0];
    });

    afterEach(async () => {
      if (orderID) {
        await rest.cancelOrder({ orderID });
      }
    });

    it('should be create a limit order', async () => {
      const request: Partial<RestOrderRequest> = {
        symbol: pair,
        side: OrderSide.Buy,
        price,
        orderQty: 25,
      };
      const res = await rest.createLimitOrder(request);
      orderID = res.order.orderID;
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
            orderQty: 25,
            price: isPositive,
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
            leavesQty: 25,
            cumQty: 0,
            multiLegReportingType: 'SingleSecurity',
            text: 'Submitted via API.',
            transactTime: overrideValue,
            timestamp: overrideValue,
          },
        }),
      ).not.toThrow();
    });

    it('should be create a limit ParticipateDoNotInitiate order', async () => {
      const request: Partial<RestOrderRequest> = {
        symbol: pair,
        side: OrderSide.Buy,
        price,
        orderQty: 25,
      };
      const res = await rest.createLimitOrderParticipateDoNotInitiate(request);
      orderID = res.order.orderID;
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
            orderQty: 25,
            price: isPositive,
            pegPriceType: '',
            currency: 'USD',
            settlCurrency: 'XBt',
            ordType: 'Limit',
            timeInForce: 'GoodTillCancel',
            execInst: 'ParticipateDoNotInitiate',
            contingencyType: '',
            exDestination: 'XBME',
            ordStatus: 'New',
            triggered: '',
            workingIndicator: true,
            ordRejReason: '',
            leavesQty: 25,
            cumQty: 0,
            multiLegReportingType: 'SingleSecurity',
            text: 'Submitted via API.',
            transactTime: overrideValue,
            timestamp: overrideValue,
          },
        }),
      ).not.toThrow();
    });

    it('should be create a stop order', async () => {
      const request: Partial<RestOrderRequest> = {
        symbol: pair,
        side: OrderSide.Sell,
        stopPx: price - 50,
        orderQty: 25,
      };
      const res = await rest.createStopOrder(request);
      orderID = res.order.orderID;
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
            side: 'Sell',
            orderQty: 25,
            price: null,
            stopPx: isPositive,
            currency: 'USD',
            settlCurrency: 'XBt',
            ordType: 'Stop',
            timeInForce: 'ImmediateOrCancel',
            exDestination: 'XBME',
            ordStatus: 'New',
            workingIndicator: false,
            leavesQty: 25,
            cumQty: 0,
            multiLegReportingType: 'SingleSecurity',
            text: 'Submitted via API.',
            transactTime: overrideValue,
            timestamp: overrideValue,
          },
        }),
      ).not.toThrow();
    });

    it('should be create a stop order with LastPrice and ReduceOnly', async () => {
      const request: Partial<RestOrderRequest> = {
        symbol: pair,
        side: OrderSide.Sell,
        stopPx: price - 50,
        orderQty: 25,
      };
      const res = await rest.createStopOrderLastPriceReduceOnly(request);
      orderID = res.order.orderID;
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
            side: 'Sell',
            orderQty: 25,
            price: null,
            stopPx: isPositive,
            currency: 'USD',
            settlCurrency: 'XBt',
            ordType: 'Stop',
            timeInForce: 'ImmediateOrCancel',
            execInst: 'LastPrice,ReduceOnly',
            exDestination: 'XBME',
            ordStatus: 'New',
            workingIndicator: false,
            leavesQty: 25,
            cumQty: 0,
            multiLegReportingType: 'SingleSecurity',
            text: 'Submitted via API.',
            transactTime: overrideValue,
            timestamp: overrideValue,
          },
        }),
      ).not.toThrow();
    });

    it('should be get a stop order', async () => {
      const request: Partial<RestOrderRequest> = {
        symbol: pair,
        side: OrderSide.Sell,
        stopPx: price - 50,
        orderQty: 25,
      };
      const res = await rest.createStopOrder(request);
      orderID = res.order.orderID;
      const resStopOrder = await rest.getStopOrder(pair);
      expect(() =>
        assertExisitingColumns(overrideTimestampColumns(resStopOrder), {
          ratelimit: {
            remaining: isPositive,
            reset: overrideValue,
            limit: isPositive,
          },
          orders: [
            {
              orderID: isUuid,
              account: isPositive,
              symbol: 'XBTUSD',
              side: 'Sell',
              orderQty: 25,
              price: null,
              displayQty: null,
              stopPx: isPositive,
              pegOffsetValue: null,
              pegPriceType: '',
              currency: 'USD',
              settlCurrency: 'XBt',
              ordType: 'Stop',
              timeInForce: 'ImmediateOrCancel',
              execInst: '',
              contingencyType: '',
              exDestination: 'XBME',
              ordStatus: 'New',
              triggered: '',
              workingIndicator: false,
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
  });

  describe('fetch/update/get/cancel order', () => {
    let order: OrderResponse;
    beforeAll(async () => {
      const res = await rest.fetchOrderbook({
        symbol: pair,
        depth: 25,
      });
      const price = +res.orderbook.bids[4][0];
      const resOrder = await rest.createLimitOrder({
        symbol: pair,
        side: OrderSide.Buy,
        price,
        orderQty: 25,
      });
      order = resOrder.order;
    });

    it('fetch order', async () => {
      const request: Partial<RestFetchOrderRequest> = {
        symbol: pair,
        filter: {
          orderID: order.orderID,
        },
      };
      const res = await rest.fetchOrder(request);
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
              account: isPositive,
              symbol: 'XBTUSD',
              side: 'Buy',
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
          ],
        }),
      ).not.toThrow();
    });

    it('update order', async () => {
      const request: Partial<RestOrderRequest> = {
        orderID: order.orderID,
        price: order.price - 1,
      };

      const res = await rest.updateOrder(request);
      expect(res.order.price).toEqual(order.price - 1);
    });

    it('get order by id', async () => {
      const res = await rest.getOrderById(pair, order.orderID);
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
              account: isPositive,
              symbol: 'XBTUSD',
              side: 'Buy',
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
              transactTime: overrideValue,
              timestamp: overrideValue,
            },
          ],
        }),
      ).not.toThrow();
    });

    it('cancel order', async () => {
      const request: Partial<RestOrderRequest> = {
        orderID: order.orderID,
      };
      const res = await rest.cancelOrder(request);
      expect(res.order.ordStatus).toEqual(OrderStatus.Canceled);
    });
  });

  it('config is null', async () => {
    const rest2 = new Rest(<any>{});
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price: 8000,
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

  it('create/fetch position ', async () => {
    const res = await rest.createPosition(pair, OrderSide.Buy, 25);
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: isPositive,
        },
        orders: [
          {
            account: isPositive,
            symbol: 'XBTUSD',
            currency: 'XBt',
            underlying: 'XBT',
            quoteCurrency: 'USD',
            commission: isPositive,
            initMarginReq: isPositive,
            maintMarginReq: isPositive,
            riskLimit: isPositive,
            leverage: isPositive,
            crossMargin: false,
            rebalancedPnl: isPositive,
            prevClosePrice: isPositive,
            execQty: 25,
            currentTimestamp: overrideValue,
            currentQty: 25,
            isOpen: true,
            timestamp: overrideValue,
            lastPrice: isPositive,
          },
        ],
      }),
    ).not.toThrow();

    const postions = await rest.fetchPosition({
      filter: {
        symbol: pair,
        isOpen: true,
      },
    });
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(postions), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: isPositive,
        },
        orders: [
          {
            account: isPositive,
            symbol: 'XBTUSD',
            currency: 'XBt',
            underlying: 'XBT',
            quoteCurrency: 'USD',
            commission: isPositive,
            initMarginReq: isPositive,
            maintMarginReq: isPositive,
            riskLimit: isPositive,
            leverage: isPositive,
            crossMargin: false,
            rebalancedPnl: isPositive,
            prevClosePrice: isPositive,
            execQty: 25,
            currentTimestamp: overrideValue,
            currentQty: 25,
            isOpen: true,
            timestamp: overrideValue,
            lastPrice: isPositive,
          },
        ],
      }),
    ).not.toThrow();
  });
});
