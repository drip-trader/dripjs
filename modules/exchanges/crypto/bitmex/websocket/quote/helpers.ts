import { BitmexPrivateEndPoints, BitmexPublicEndPoints, BitmexQuoteResponse } from '../../types';
import { QuoteSource } from './types';

export function transform(source: QuoteSource): BitmexQuoteResponse {
  return {
    timestamp: new Date(source.timestamp).getTime(),
    bidAmount: source.bidSize,
    bidPrice: source.bidPrice,
    askAmount: source.askSize,
    askPrice: source.askPrice,
  };
}

export function getTradeChannel(pair: string, endPoint?: BitmexPublicEndPoints | BitmexPrivateEndPoints): string {
  return `${endPoint ? endPoint : BitmexPublicEndPoints.Quote}:${pair}`;
}
