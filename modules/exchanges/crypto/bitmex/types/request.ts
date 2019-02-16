import { ExecInst, OrderSide, OrderStatus, OrderType, TimeInForce } from './order';

export interface OrderRequest {
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

export interface FetchOrderRequest {
  symbol: string;
  filter: { [filterKey: string]: string };
  columns: string[];
  count: number;
  start: number;
  reverse: boolean;
  startTime: string;
  endTime: string;
}

export interface OrderbookRequest {
  symbol: string;
  depth: number;
}
