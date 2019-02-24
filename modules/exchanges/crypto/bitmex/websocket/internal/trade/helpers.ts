import { BitmexPrivateEndPoints, BitmexPublicEndPoints, BitmexTradeResponse } from '../../../types';
import { TradeSource } from './types';

export function transform(source: TradeSource): BitmexTradeResponse {
  return {
    side: source.side,
    price: source.price,
    amount: source.size,
    timestamp: new Date(source.timestamp).getTime(),
  };
}

export function getTradeChannel(pair: string, endPoint?: BitmexPublicEndPoints | BitmexPrivateEndPoints): string {
  return `${endPoint ? endPoint : BitmexPublicEndPoints.Trade}:${pair}`;
}
