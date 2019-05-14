import { SettlementResponse } from '../../../../types';
import { SettlementSource } from './types';

export function transform(source: SettlementSource): SettlementResponse {
  return {
    ...source,
    timestamp: new Date(source.timestamp).getTime(),
  };
}
