import { testnetConfig } from '@dripjs/testing';
import { Subject } from 'rxjs';
import { flatMap } from 'rxjs/internal/operators';
import { take } from 'rxjs/operators';

import { OrderSide, OrderStatus, OrderType } from '../../../../types';
import { MAX_REMAINING_NUM } from '../../../constants';
import { RestFetchOrderRequest, RestOrderRequest } from '../../../types';
import { Orderbook } from '../../public';
import { Order } from './order';

describe('Bitmex Rest Position', () => {
  const pair = 'XBTUSD';
  const remaining$ = new Subject<number>();
  const order = new Order(testnetConfig, remaining$);
  const orderbook = new Orderbook(testnetConfig, remaining$);
  let orderId: string;
  let price: number;

  it('create order', (done) => {
    orderbook
      .fetch({
        symbol: pair,
        depth: 5,
      })
      .pipe(
        take(1),
        flatMap((orderbookRes) => {
          price = +orderbookRes.data.bids[4][0];
          const request: Partial<RestOrderRequest> = {
            symbol: pair,
            side: OrderSide.Buy,
            price,
            orderQty: 25,
            ordType: OrderType.Limit,
          };

          return order.create(request);
        }),
      )
      .subscribe((res) => {
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

    order.fetch(request).subscribe((res) => {
      expect(res.data[0].price).toEqual(price);
      done();
    });
  });

  it.skip('fetch multiple order', (done) => {
    const order2 = new Order(testnetConfig, remaining$);
    const request: Partial<RestFetchOrderRequest> = {
      symbol: pair,
      filter: {
        orderID: ['989e9b5d-6f4c-a9fd-3f68-1e4faee265e2', '01870ed8-92b4-73fd-b47e-0b1ed8017c11'],
      },
    };

    order2.fetch(request).subscribe((res) => {
      expect(res.data[0].price).toEqual(price);
      done();
    });
  });

  it('update order', (done) => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };
    order.update(request).subscribe((res) => {
      expect(res.data.price).toEqual(price - 1);
      done();
    });
  });

  it('cancel order', (done) => {
    const request: Partial<RestOrderRequest> = {
      orderID: orderId,
    };
    order.cancel(request).subscribe((res) => {
      expect(res.data[0].ordStatus).toEqual(OrderStatus.Canceled);
      done();
    });
  });
});
