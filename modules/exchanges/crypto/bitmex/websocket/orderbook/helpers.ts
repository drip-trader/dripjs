import { OrderbookL2T25Response, PublicEndPoints } from '../../types';
import { WebsocketData } from '../types';
import { OrderbookSource } from './types';

/**
 * transform raw websocket data to OrderbookL2T25Response
 * @param source raw websocket data
 */
export function transform(source: WebsocketData<OrderbookSource>): OrderbookL2T25Response {
  const orderbook: OrderbookL2T25Response = {
    bids: [],
    asks: [],
  };

  for (const item of source.data) {
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

export function update(
  originSource: WebsocketData<OrderbookSource>,
  updateSource: WebsocketData<OrderbookSource>,
): WebsocketData<OrderbookSource> {
  const originData = originSource.data || [];
  const updateData = updateSource.data || [];

  originSource.data = originData;

  let currentPosition = 0;
  for (const updateItem of updateData) {
    const position = findPosition(originData, updateItem, currentPosition);
    if (originData[position] && originData[position].id === updateItem.id) {
      // found => update size or delete
      if (updateSource.action === 'update') {
        originData[position].size = updateItem.size;
        currentPosition = position + 1;
      } else if (updateSource.action === 'delete') {
        originData.splice(position, 1);
        currentPosition = position;
      }
    } else if (updateSource.action === 'insert') {
      // not found, insert to position
      originData.splice(position, 0, updateItem);
      currentPosition = position + 1;
    }
  }

  return originSource;
}

export function getChannel(
  pair: string,
  endpoint: PublicEndPoints.OrderBook10 | PublicEndPoints.OrderBookL2 | PublicEndPoints.OrderBookL2T25,
): string {
  return `${endpoint}:${pair}`;
}

// [{"symbol":"XBTUSD","id":8799599650,"side":"Sell","size":229425,"price":4003.5},{"symbol":"XBTUSD","id":8799600900,"side":"Buy","size":72647,"price":3991}]}

/**
 * find the first position in originSource that id larger or equal than update's id
 *
 * @param originSource
 * @param updateSource
 * @param fromId
 */
function findPosition(originSource: OrderbookSource[], updateSource: OrderbookSource, fromId: number = 0): number {
  let i = fromId;
  for (; i < originSource.length; i++) {
    if (originSource[i].id >= updateSource.id) {
      break;
    }
  }

  return i;
}
