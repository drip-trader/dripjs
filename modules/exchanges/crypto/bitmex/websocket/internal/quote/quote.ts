import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BitmexQuoteResponse } from '../../../types';
import { Websocket } from '../websocket';
import { getTradeChannel, transform } from './helpers';
import { QuoteSource } from './types';

export class Quote {
  constructor(private readonly ws: Websocket) {}

  /**
   * latest trade
   *
   * @param pair
   */
  quote$(pair: string): Observable<BitmexQuoteResponse> {
    const channel = getTradeChannel(pair);

    return this.ws.subscribe<QuoteSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopQuote(pair: string): void {
    const channel = getTradeChannel(pair);
    this.ws.unsubscribe(channel);
  }
}
