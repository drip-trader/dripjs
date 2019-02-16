import { Headers } from 'node-fetch';

import { RateLimit } from './exchange';
import { OrderSide } from './order';

export interface RestResponse {
  headers: Headers;
  body: { [attr: string]: any };
}

/**
 * level 2 order book
 */
export interface OrderbookL2Response {
  /**
   * price and amount of ask (asc order)
   * eg: [[price, amount], ...]
   */
  asks: [string, string][];
  /**
   * price and amount of bid (desc order)
   * eg: [[price, amount], ...]
   */
  bids: [string, string][];
}

export interface Error {
  message: string;
  name: string;
}

export interface ErrorResponse {
  error?: Error;
}

export interface TradeResponse extends ErrorResponse {
  id: number;
  side: OrderSide;
  price: number;
  amount: number;
  timestamp: number;
}

export interface OrderResponse extends ErrorResponse {
  orderID: string;
  clOrdID?: string;
  clOrdLinkID?: string;
  account?: string;
  symbol?: string;
  side?: string;
  simpleOrderQty?: number;
  orderQty?: number;
  price?: number;
  displayQty?: number;
  stopPx?: number;
  pegOffsetValue?: number;
  pegPriceType?: string;
  currency?: string;
  settlCurrency?: string;
  ordType?: string;
  timeInForce?: string;
  execInst?: string;
  contingencyType?: string;
  exDestination?: string;
  ordStatus?: string;
  triggered?: string;
  workingIndicator?: boolean;
  ordRejReason?: string;
  simpleLeavesQty?: number;
  leavesQty?: number;
  simpleCumQty?: number;
  cumQty?: number;
  avgPx?: number;
  multiLegReportingType?: string;
  text?: string;
  transactTime?: Date;
  timestamp?: string;
}

export interface OrderbookResponse extends ErrorResponse {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
}

export interface RestOrderResponse {
  ratelimit: RateLimit;
  order: OrderResponse;
}

export interface RestOrdersResponse {
  ratelimit: RateLimit;
  orders: OrderResponse[];
}

export interface RestOrderbookL2Response {
  ratelimit: RateLimit;
  orderbook: OrderbookL2Response;
}
