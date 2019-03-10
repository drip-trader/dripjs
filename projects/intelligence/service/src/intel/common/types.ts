import { Symbol } from 'dripjs-types';

import { Spy } from '../../../..';

export interface IntelErrorResponse {
  name: string;
  message: string;
}

export interface IntelGetSymbolsResponse {
  symbols: Symbol[];
  error?: IntelErrorResponse;
}

export interface SpyImpl {
  spy?: Spy;
  error?: IntelErrorResponse;
}
