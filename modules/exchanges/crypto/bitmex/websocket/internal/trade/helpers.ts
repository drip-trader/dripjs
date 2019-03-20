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

export function getTradeChannel(pair?: string | string[], endPoint?: PublicEndPoints | PrivateEndPoints): string {
  const ep = endPoint ? endPoint : PublicEndPoints.Trade;
  let subStr = `${ep}`;
  if (pair) {
    let streamName = '';
    if (pair instanceof Array) {
      for (const p of pair) {
        streamName = `${streamName}_${ep}:${p}`;
      }
    } else {
      streamName = `${ep}:${pair}`;
    }
    subStr = streamName;
  }

  return subStr;
}
