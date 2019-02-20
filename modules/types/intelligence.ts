import { OrderSide } from './order';

export interface Ticker {
  ask: number;
  bid: number;
  high: number;
  low: number;
  last: number;
  volume: number;
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
