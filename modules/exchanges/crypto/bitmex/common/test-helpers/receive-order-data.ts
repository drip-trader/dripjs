import { testnetConfig } from '@dripjs/testing';
import { Observable, Subject } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Order, Orderbook } from '../../rest/internal';
import { OrderResponse, OrderSide, OrderType } from '../../types';

/**
 * 创建新订单后,执行特定方法,之后自动清除订单。
 * @param symbol 商品id
 * @param handler 执行的特定方法
 * @return void
 */
export const receiveOrderData = <T>(symbol: string, handler: (order: OrderResponse) => Promise<T>): Observable<T> => {
  const remaining$ = new Subject<number>();
  const order = new Order(testnetConfig, remaining$);
  const orderbook = new Orderbook(testnetConfig, remaining$);

  return orderbook
    .fetch({
      symbol,
      depth: 10,
    })
    .pipe(
      take(1),
      mergeMap((res) =>
        order.create({
          symbol,
          side: OrderSide.Buy,
          price: +res.data.bids[4][0],
          orderQty: 25,
          ordType: OrderType.Limit,
        }),
      ),
      mergeMap(async (oRes) => {
        const res = await handler(oRes.data);
        await order
          .cancel({
            orderID: oRes.data.orderID,
          })
          .toPromise();

        return res;
      }),
    );
};
