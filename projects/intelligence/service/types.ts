import { RealtimeType } from '@dripjs/types';

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
