import { ExecInst, OrderSide, OrderStatus, OrderType, PositionResponse, Resolution, TimeInForce } from '../../types';

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
  execInst: ExecInst | string;
  ordStatus: OrderStatus;
  text: string;
}

export interface RestMultipleOrderRequest {
  orders: Partial<RestOrderRequest>[];
}

export interface RestCancelMultipleOrderRequest {
  symbol: string;
  filter: Partial<RestOrderRequest>;
  /** cancellation annotation. e.g. 'Spread Exceeded */
  text: number;
}

export interface RestFetchOrderRequest {
  symbol: string;
  filter: { [filterKey: string]: any };
  columns: string[];
  count: number;
  start: number;
  reverse: boolean;
  startTime: string;
  endTime: string;
}

export interface RestFetchPositionRequest {
  filter: Partial<PositionResponse>;
  columns: string[];
  count: number;
}

export interface RestLeverageRequest {
  symbol: string;
  leverage: number;
}

export interface RestOrderbookRequest {
  symbol: string;
  depth: number;
}

export interface RestBarRequest {
  binSize: Resolution;
  symbol: string;
  count?: number;
  reverse?: boolean;
  startTime?: string;
  endTime?: string;
}
