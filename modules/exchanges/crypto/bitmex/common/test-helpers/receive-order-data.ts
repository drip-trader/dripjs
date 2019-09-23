import { testnetConfig } from '@dripjs/testing';

import { Order } from '../../rest/internal/private/order';
import { Orderbook } from '../../rest/internal/public/orderbook';
import { RestOrderResponse, RestOrderbookL2Response } from '../../rest/types';
import { OrderResponse, OrderSide, OrderType } from '../../types';

/**
 * 创建新订单后,执行特定方法,之后自动清除订单。
 * @param symbol 商品id
 * @param handler 执行的特定方法
 * @return void
 */
export const receiveOrderData = async <T>(symbol: string, handler: (order: OrderResponse) => Promise<any> = async () => {}): Promise<T> => {
  const order = new Order(testnetConfig);
  const orderbook = new Orderbook(testnetConfig);
  const obRes = (await orderbook.fetch({
    symbol,
    depth: 10,
  })) as RestOrderbookL2Response;
  const price = +obRes.data.bids[4][0];
  const odRes = (await order.create({
    symbol,
    side: OrderSide.Buy,
    price,
    orderQty: 25,
    ordType: OrderType.Limit,
  })) as RestOrderResponse;
  const result = await handler(odRes.data);
  await order.cancel({
    orderID: odRes.data.orderID,
  });

  return result;
};
