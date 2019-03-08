import { PrivateEndPoints, PublicEndPoints, QuoteResponse } from '../../../types';
import { QuoteSource } from './types';

export function transform(source: QuoteSource): QuoteResponse {
  return {
    timestamp: new Date(source.timestamp).getTime(),
    bidAmount: source.bidSize,
    bidPrice: source.bidPrice,
    askAmount: source.askSize,
    askPrice: source.askPrice,
  };
}

export function getTradeChannel(pair: string): string {
  return `${PublicEndPoints.Quote}:${pair}`;
}
