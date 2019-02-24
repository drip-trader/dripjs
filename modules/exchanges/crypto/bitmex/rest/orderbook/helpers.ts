import { BitmexOrderbookL2Response, BitmexOrderbookResponse } from '../../types';

/**
 * transform raw websocket data to OrderbookL2Response
 * @param source raw websocket data
 */
export function transform(source: BitmexOrderbookResponse[]): BitmexOrderbookL2Response {
  const orderbook: BitmexOrderbookL2Response = {
    bids: [],
    asks: [],
  };

  for (const item of source) {
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
