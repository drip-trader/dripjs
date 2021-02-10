import { OrderbookL2Response, OrderbookResponse } from '../types';

export function transformOrderbook(data: OrderbookResponse[]): OrderbookL2Response {
  const orderbook: OrderbookL2Response = {
    bids: [],
    asks: [],
  };
  for (const item of data) {
    const orderbookItem: [string, string] = [`${item.price}`, `${item.size}`];
    if (item.side === 'Sell') {
      orderbook.asks.push(orderbookItem);
    } else {
      orderbook.bids.push(orderbookItem);
    }
  }
  orderbook.asks.reverse();

  return orderbook;
}
