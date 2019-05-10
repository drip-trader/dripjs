import { OrderStatus } from '@dripjs/types';

import { ExecInst, OrderSide, OrderType, TimeInForce } from './order';

export interface RestOrderRequest {
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
  ordType: OrderType;
  timeInForce?: TimeInForce;
  orderID?: string;
  execInst: ExecInst;
  ordStatus: OrderStatus;
  text: string;
}

export interface RestFetchOrderRequest {
  symbol: string;
  filter: { [filterKey: string]: string };
  columns: string[];
  count: number;
  start: number;
  reverse: boolean;
  startTime: string;
  endTime: string;
}

export interface RestOrderbookRequest {
  symbol: string;
  depth: number;
}

export enum Resolution {
  min1 = '1m',
  min5 = '5m',
  hour = '1h',
  day = '1d',
}

export interface RestBarRequest {
  binSize: Resolution;
  symbol: string;
  count?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}
