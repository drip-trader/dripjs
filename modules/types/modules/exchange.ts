export interface Exchange {
  name: string;
  type: ExchangeType;
  isEnabled: boolean;
}

export enum ExchangeType {
  Crypto = 'crypto',
  Stock = 'stock',
  Futures = 'futures',
}

export enum SupportedExchange {
  Bitmex = 'bitmex',
  BitmexTestNet = 'bitmexTestNet',
}

export interface Market {
  code: string;
  name: string;
  desc?: string;
}

export interface Pair {
  name: string;
  exchange: string;
  baseAsset: string;
  quoteAsset: string;
  amountPrecision: number;
  pricePrecision: number;
  minOrderAmount: number;
  maxOrderAmount: number;
  minOrderPrice: number;
  maxOrderPrice: number;
  isEnabled: boolean;
}

export interface Stock {
  code: string;
  name: string;
  fullName: string;
  pricePrecision: number;
  amountPrecision: number;
}

export type Symbol = Pair | Stock;

export interface Asset {
  name: string;
  precision: number;
}

export interface Credential {
  apiKey: string;
  apiSecret: string;
}
