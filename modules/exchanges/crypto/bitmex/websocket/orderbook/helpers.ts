import { OrderbookL2T25, PublicEndPoints } from '../../types';
import { WebsocketData } from '../types';
import { OrderbookData } from './types';

/**
 * transform raw websocket data to OrderbookL2T25
 * @param ws raw websocket data
 */
export function transform(ws: WebsocketData<OrderbookData>): OrderbookL2T25 {
  const orderbook: OrderbookL2T25 = {
    bids: [],
    asks: [],
  };

  for (const item of ws.data) {
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

export function update(origin: WebsocketData<OrderbookData>, update: WebsocketData<OrderbookData>): WebsocketData<OrderbookData> {
  const originData = origin.data || [];
  const updateData = update.data || [];

  origin.data = originData;

  let currentPosition = 0;
  for (const updateItem of updateData) {
    const position = findPosition(originData, updateItem, currentPosition);
    if (originData[position] && originData[position].id === updateItem.id) {
      // found => update size or delete
      if (update.action === 'update') {
        originData[position].size = updateItem.size;
        currentPosition = position + 1;
      } else if (update.action === 'delete') {
        originData.splice(position, 1);
        currentPosition = position;
      }
    } else if (update.action === 'insert') {
      // not found, insert to position
      originData.splice(position, 0, updateItem);
      currentPosition = position + 1;
    }
  }

  return origin;
}

export function getChannel(
  pair: string,
  endpoint: PublicEndPoints.OrderBook10 | PublicEndPoints.OrderBookL2 | PublicEndPoints.OrderBookL2T25,
): string {
  return `${endpoint}:${pair}`;
}

// [{"symbol":"XBTUSD","id":8799599650,"side":"Sell","size":229425,"price":4003.5},{"symbol":"XBTUSD","id":8799600900,"side":"Buy","size":72647,"price":3991}]}

/**
 * find the first position in origin that id larger or equal than update's id
 *
 * @param origin
 * @param update
 * @param fromId
 */
function findPosition(origin: OrderbookData[], update: OrderbookData, fromId: number = 0): number {
  let i = fromId;
  for (; i < origin.length; i++) {
    if (origin[i].id >= update.id) {
      break;
    }
  }

  return i;
}
