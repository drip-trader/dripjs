import { BitmexPublicEndPoints, BitmexSettlementResponse } from '../../types';
import { SettlementSource } from './types';

export function transform(source: SettlementSource): BitmexSettlementResponse {
  return {
    ...source,
    timestamp: new Date(source.timestamp).getTime(),
  };
}

export function getTradeChannel(pair: string): string {
  return `${BitmexPublicEndPoints.Settlement}:${pair}`;
}
