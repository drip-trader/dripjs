import { PublicEndPoints, TradeResponse } from '../../types';
import { TradeSource } from './types';

export function transform(source: TradeSource): TradeResponse {
  return {
    id: 1,
    side: source.side,
    price: source.price,
    amount: source.size,
    timestamp: new Date(source.timestamp).getTime(),
  };
}

export function getTradeChannel(pair: string): string {
  return `${PublicEndPoints.Trade}:${pair}`;
}
