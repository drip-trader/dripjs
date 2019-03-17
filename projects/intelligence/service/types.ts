import { RealtimeType } from 'dripjs-types';

export interface IntelErrorResponse {
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
