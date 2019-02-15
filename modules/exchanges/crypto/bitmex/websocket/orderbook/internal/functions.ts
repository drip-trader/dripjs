import { IOrderbook } from '../../../types';
import { WebsocketData } from '../../types';
import { BitmexOrderbookWebsocketData } from './types';

export function adaptBitmexOrderbook(orderbookWs: WebsocketData<BitmexOrderbookWebsocketData>): IOrderbook {
  const orderbook: IOrderbook = {
    bids: [],
    asks: [],
  };

  for (const item of orderbookWs.data) {
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

export function bitmexUpdateOrderbook(
  origin: WebsocketData<BitmexOrderbookWebsocketData>,
  update: WebsocketData<BitmexOrderbookWebsocketData>,
): WebsocketData<BitmexOrderbookWebsocketData> {
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

// [{"symbol":"XBTUSD","id":8799599650,"side":"Sell","size":229425,"price":4003.5},{"symbol":"XBTUSD","id":8799600900,"side":"Buy","size":72647,"price":3991}]}

/**
 * find the first position in origin that id larger or equal than update's id
 *
 * @param origin
 * @param update
 * @param fromId
 */
function findPosition(origin: BitmexOrderbookWebsocketData[], update: BitmexOrderbookWebsocketData, fromId: number = 0): number {
  let i = fromId;
  for (; i < origin.length; i++) {
    if (origin[i].id >= update.id) {
      break;
    }
  }

  return i;
}
