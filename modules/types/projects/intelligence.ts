import { OrderSide } from '../modules/order';

export interface Ticker {
  ask: number;
  bid: number;
  /**
   * 0 is not supported by the exchange
   */
  high: number;
  /**
   * 0 is not supported by the exchange
   */
  low: number;
  last: number;
  volume: number;
  time: number;
}

export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface BarRequest {
  symbol: string;
  resolution: string;
  start: number;
  end: number;
}

export type Price = number;
export type Amount = number;

export interface Depth {
  asks: [Price, Amount][];
  bids: [Price, Amount][];
}

export interface Transaction {
  time: number;
  side: OrderSide;
  price: number;
  amount: number;
}

export type RealtimeType = Ticker | Depth | Transaction;

export interface IntelError {
  name: string;
  message: string;
}

export interface IntelRealtimeResponse {
  channel: IntelChannel;
  data: RealtimeType;
}

export enum IntelChannel {
  Ticker = 'tick',
  Depth = 'depth',
  Transaction = 'transaction',
}

export interface GetBarsInput {
  exchange: string;
  symbol: string;
  resolution: string;
  start: number;
  end: number;
}

export interface RealtimeInput {
  exchange: string;
  symbol: string;
  channel: IntelChannel;
}

export interface IntelClientOptions {
  ip: string;
  port: number;
  username: string;
  password: string;
}
