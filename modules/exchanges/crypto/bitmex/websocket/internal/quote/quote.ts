import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PublicEndPoints, QuoteResponse } from '../../../types';
import { getTradeChannel } from '../../helpers';
import { Websocket } from '../websocket';
import { transform } from './helpers';
import { QuoteSource } from './types';

export class Quote {
  constructor(private readonly ws: Websocket) {}

  /**
   * latest quote
   *
   * @param pair
   */
  quote$(pair?: string | string[]): Observable<QuoteResponse> {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.Quote});

    return this.ws.subscribe<QuoteSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopQuote(pair?: string | string[]): void {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.Quote});
    this.ws.unsubscribe(channel);
  }
}
