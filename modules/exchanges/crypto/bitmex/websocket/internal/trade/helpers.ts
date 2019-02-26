import { PrivateEndPoints, PublicEndPoints, TradeResponse } from '../../../types';
import { TradeSource } from './types';

export function transform(source: TradeSource): TradeResponse {
  return {
    side: source.side,
    price: source.price,
    amount: source.size,
    timestamp: new Date(source.timestamp).getTime(),
  };
}

export function getTradeChannel(pair: string, endPoint?: PublicEndPoints | PrivateEndPoints): string {
  return `${endPoint ? endPoint : PublicEndPoints.Trade}:${pair}`;
}
