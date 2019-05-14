import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getChannelName } from '../../../../common';
import { QuoteResponse } from '../../../../types';
import { PublicEndPoints } from '../../../types';
import { WebsocketInsider } from '../../websocket-insider';
import { transform } from './helpers';
import { QuoteSource } from './types';

export class Quote {
  constructor(private readonly ws: WebsocketInsider) {}

  /**
   * latest quote
   *
   * @param pair
   */
  quote$(pair?: string | string[]): Observable<QuoteResponse> {
    const channel = getChannelName({ pair, endPoint: PublicEndPoints.Quote });

    return this.ws.subscribe<QuoteSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopQuote(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: PublicEndPoints.Quote });
    this.ws.unsubscribe(channel);
  }
}
