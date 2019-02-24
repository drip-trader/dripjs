import { OrderStatus } from 'dripjs-types';

import { BitmexExecInst, BitmexOrderType, BitmexTimeInForce, BitmexOrderSide as OrderSide } from './order';

export interface BitmexRestOrderRequest {
  symbol: string;
  side: OrderSide;
  orderQty: number;
  price: number;
  displayQty?: number;
  stopPx?: number;
  clOrdID?: number;
  clOrdLinkID?: string;
  pegOffsetValue?: number;
  pegPriceType?: string;
  ordType: BitmexOrderType;
  timeInForce?: BitmexTimeInForce;
  orderID?: string;
  execInst: BitmexExecInst;
  ordStatus: OrderStatus;
  text: string;
}

export interface BitmexRestFetchOrderRequest {
  symbol: string;
  filter: { [filterKey: string]: string };
  columns: string[];
  count: number;
  start: number;
  reverse: boolean;
  startTime: string;
  endTime: string;
}

export interface BitmexRestOrderbookRequest {
  symbol: string;
  depth: number;
}

export enum BitmexResolution {
  min1 = '1m',
  min5 = '5m',
  hour = '1h',
  day = '1d',
}

export interface BitmexRestBarRequest {
  binSize: BitmexResolution;
  symbol: string;
  count?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}
