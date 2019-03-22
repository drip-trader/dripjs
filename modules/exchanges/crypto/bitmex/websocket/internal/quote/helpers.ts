import { QuoteResponse } from '../../../types';
import { QuoteSource } from './types';

export function transform(source: QuoteSource): QuoteResponse {
  return {
    symbol: source.symbol,
    timestamp: new Date(source.timestamp).getTime(),
    bidAmount: source.bidSize,
    bidPrice: source.bidPrice,
    askAmount: source.askSize,
    askPrice: source.askPrice,
  };
}
