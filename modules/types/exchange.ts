export interface Exchange {
  code: string;
  name: string;
  desc?: string;
}

export interface Market {
  code: string;
  name: string;
  desc?: string;
}

export interface Pair {
  name: string;
  baseAsset: string;
  quoteAsset: string;
  amountPrecision: number;
  pricePrecision: number;
}

export interface Asset {
  name: string;
  precision: number;
}

export interface Credential {
  apiKey: string;
  secret: string;
}
