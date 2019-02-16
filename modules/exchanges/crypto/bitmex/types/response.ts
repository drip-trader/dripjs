import { RateLimit } from './exchange';
import { OrderSide } from './order';
import { Headers } from 'node-fetch';

export interface RestResponse {
  headers: Headers;
  body: { [attr: string]: any };
}

/**
 * Top 25 levels of level 2 order book
 */
export interface OrderbookL2T25Response {
  /**
   * price and amount of Top 25 ask (asc order)
   * eg: [[price, amount], ...]
   */
  asks: [string, string][];
  /**
   * price and amount of Top 25 bid (desc order)
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

export interface RestOrderResponse {
  ratelimit: RateLimit;
  order: OrderResponse;
}

export interface RestOrdersResponse {
  ratelimit: RateLimit;
  orders: OrderResponse[];
}
