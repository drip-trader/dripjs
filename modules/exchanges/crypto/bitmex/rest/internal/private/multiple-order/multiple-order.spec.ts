import { testnetConfig } from '@dripjs/testing';
import { Subject } from 'rxjs';
import { flatMap, take } from 'rxjs/operators';

import { OrderSide, OrderType } from '../../../../types';
import { RestMultipleOrderRequest, RestOrderRequest } from '../../../types';
import { Orderbook } from '../../public';
import { MultipleOrder } from './multiple-order';

describe('Bitmex Rest Position', () => {
  const pair = 'XBTUSD';
  const remaining$ = new Subject<number>();
  const multipleOrder = new MultipleOrder(testnetConfig, remaining$);
  const orderbook = new Orderbook(testnetConfig, remaining$);
  let orderId: string;
  let orderId2: string;
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
          const request1: Partial<RestOrderRequest> = {
            symbol: pair,
            side: OrderSide.Buy,
            price,
            orderQty: 25,
            ordType: OrderType.Limit,
          };
          const request2: Partial<RestOrderRequest> = {
            symbol: pair,
            side: OrderSide.Buy,
            price: price - 1,
            orderQty: 25,
            ordType: OrderType.Limit,
          };
          const request: RestMultipleOrderRequest = {
            orders: [request1, request2],
          };

          return multipleOrder.create(request);
        }),
      )
      .subscribe((res) => {
        orderId = res.data[0].orderID;
        orderId2 = res.data[1].orderID;
        expect(res.data.length).toEqual(2);
        done();
      });
  });

  it('update order', (done) => {
    const request1: Partial<RestOrderRequest> = {
      orderID: orderId,
      price: price - 1,
    };
    const request2: Partial<RestOrderRequest> = {
      orderID: orderId2,
      price: price - 2,
    };
    const request: RestMultipleOrderRequest = {
      orders: [request1, request2],
    };
    multipleOrder.update(request).subscribe((res) => {
      expect(res).toBeDefined();
    });
    done();
  });

  it('cancel order', (done) => {
    multipleOrder
      .cancel({
        filter: { side: OrderSide.Buy },
      })
      .subscribe((res) => {
        expect(res.data.length).toEqual(2);
        done();
      });
  });

  it('cancel stop order', (done) => {
    multipleOrder
      .cancel({
        symbol: pair,
      })
      .subscribe((res) => {
        console.log(res);
        done();
      });
  });
});
