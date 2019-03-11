import { Symbol } from 'dripjs-types';

export interface IntelErrorResponse {
  name: string;
  message: string;
}

export interface IntelGetSymbolsResponse {
  symbols: Symbol[];
}
