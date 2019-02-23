import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettlementResponse } from '../../types';
import { Websocket } from '../websocket';
import { getTradeChannel, transform } from './helpers';
import { SettlementSource } from './types';

export class Settlement {
  constructor(private readonly ws: Websocket) {}

  /**
   * latest trade
   *
   * @param pair
   */
  settlement$(pair: string): Observable<SettlementResponse> {
    const channel = getTradeChannel(pair);

    return this.ws.subscribe<SettlementSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopSettlement(pair: string): void {
    const channel = getTradeChannel(pair);
    this.ws.unsubscribe(channel);
  }
}
