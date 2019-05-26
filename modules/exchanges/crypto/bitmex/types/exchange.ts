export interface Config {
  apiKey: string;
  apiSecret: string;
  testnet?: boolean;
  corsProxy?: string;
  apiUrl?: string;
}

export interface RateLimit {
  remaining: number;
  reset: number;
  limit: number;
}

export enum Resolution {
  min1 = '1m',
  min5 = '5m',
  hour = '1h',
  day = '1d',
}
