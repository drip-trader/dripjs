import { TradeResponse } from '../../../types';
import { TradeSource } from './types';

export function transform(source: TradeSource): TradeResponse {
  return {
    symbol: source.symbol,
    side: source.side,
    price: source.price,
    amount: source.size,
    timestamp: new Date(source.timestamp).getTime(),
  };
}
