import { Trade } from '../../../../types';
import { BitmexTradeWebsocketData } from './types';

export function adaptBitmexTrade(bitmexTrade: BitmexTradeWebsocketData): Trade {
  return {
    id: 1,
    side: bitmexTrade.side,
    price: bitmexTrade.price,
    amount: bitmexTrade.size,
    timestamp: new Date(bitmexTrade.timestamp).getTime(),
  };
}
