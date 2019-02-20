import { BitmexRest, BitmexWS, Config } from '@dripjs/exchanges';
import { Bar, BarRequest, Depth, Symbol, Ticker } from '@dripjs/types';
import { Observable } from 'rxjs';

import { Intelligence } from '../intelligence';

export class Bitmex extends Intelligence {
  rest: BitmexRest;
  ws: BitmexWS;

  constructor(config: Config) {
    super();

    this.rest = new BitmexRest(config);
    this.ws = new BitmexWS(config);
  }

  async getSymbolInfo(symbol: string): Promise<Symbol> {
    return <any>{};
  }
  getTicker(symbol: string): Observable<Ticker> {
    return <any>{};
  }
  async getBars(request: BarRequest): Promise<Bar[]> {
    return <any>{};
  }
  getDepth(symbol: string): Observable<Depth> {
    return <any>{};
  }
  getTransactions(symbol: string): Observable<Symbol> {
    return <any>{};
  }
  test(): void {}
}
