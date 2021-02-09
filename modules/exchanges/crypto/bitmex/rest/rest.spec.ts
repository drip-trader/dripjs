import { testnetConfig } from '@dripjs/testing';
import * as moment from 'moment';

import { receiveOrderData } from '../common/test-helpers';
import { OrderSide, OrderStatus, OrderType, Resolution } from '../types';
import { MAX_REMAINING_NUM } from './constants';
import { Rest } from './rest';
import { RestCancelMultipleOrderRequest, RestFetchOrderRequest, RestOrderRequest, RestOrderbookRequest } from './types';

describe('Bitmex Rest', () => {
  const pair = 'XBTUSD';
  const rest = new Rest(testnetConfig);
  let orderId: string;
  let price: number;

  it('fetch orderbook', (done) => {
    const request: RestOrderbookRequest = {
      symbol: pair,
      depth: 25,
    };
    rest.fetchOrderbook(request).subscribe((res) => {
      price = +res.data.bids[4][0];
      expect(res.data.bids.length).toEqual(25);
      expect(res.data.asks.length).toEqual(25);
      done();
    });
  });

  it('create order', (done) => {
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };
    rest.createOrder(request).subscribe((res) => {
      orderId = res.data.orderID;
      expect(res.data).toBeDefined();
      expect(res.rateLimit.limit).toEqual(MAX_REMAINING_NUM);
      done();
    });
  });

  it('fetch order', (done) => {
    const request: Partial<RestFetchOrderRequest> = {
      symbol: pair,
      filter: {
        orderID: orderId,
      },
    };
    rest.fetchOrder(request).subscribe((res) => {
      expect(res.data[0].price).toEqual(price);
      done();
    });
  });

  it('update order', (done) => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };
    rest.updateOrder(request).subscribe((res) => {
      expect(res.data.price).toEqual(price - 1);
      done();
    });
  });

  it('cancel order', (done) => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
    };
    rest.cancelOrder(request).subscribe((res) => {
      expect(res.data[0].ordStatus).toEqual(OrderStatus.Canceled);
      done();
    });
  }); // cancelMultipleOrder

  it('cancelMultipleOrder', (done) => {
    const request: Partial<RestCancelMultipleOrderRequest> = {
      symbol: 'XBTUSD',
    };
    rest.cancelMultipleOrder(request).subscribe((res) => {
      expect(res.data[0].ordStatus).toEqual(OrderStatus.Canceled);
      done();
    });
  });

  it('get order by id', (done) => {
    receiveOrderData(pair, async (order) => {
      price = order.price ? order.price : 0;

      return rest.getOrderById(pair, order.orderID).toPromise();
    }).subscribe((res) => {
      expect(res.data[0].price).toEqual(price);
      done();
    });
  });

  it('config is null', (done) => {
    const rest2 = new Rest(<any>{});
    const request: Partial<RestOrderRequest> = {
      symbol: pair,
      side: OrderSide.Buy,
      price,
      orderQty: 25,
      ordType: OrderType.Limit,
    };

    rest2.createOrder(request).subscribe(
      () => {},
      (error) => {
        expect(error).toBeDefined();
        done();
      },
    );
  });

  it('fetch instrument', (done) => {
    rest.fetchInstrument().subscribe((res) => {
      expect(res.data.length).toBeGreaterThan(0);
      done();
    });
  });

  it('fetch bar', (done) => {
    const time = Date.now();
    rest
      .fetchBar({
        symbol: pair,
        binSize: Resolution.day,
        startTime: moment(time - 1000 * 60 * 60 * 24 * 60).toISOString(),
        endTime: moment(time).toISOString(),
      })
      .subscribe((res) => {
        expect(res.data.length).toEqual(60);
        done();
      });
  });
});
