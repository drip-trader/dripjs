import { PublicEndPoints, SettlementResponse } from '../../../types';
import { SettlementSource } from './types';

export function transform(source: SettlementSource): SettlementResponse {
  return {
    ...source,
    timestamp: new Date(source.timestamp).getTime(),
  };
}

export function getTradeChannel(pair: string): string {
  return `${PublicEndPoints.Settlement}:${pair}`;
}
