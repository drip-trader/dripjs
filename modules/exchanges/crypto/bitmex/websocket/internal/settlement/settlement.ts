import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PublicEndPoints, SettlementResponse } from '../../../types';
import { getTradeChannel } from '../../helpers';
import { Websocket } from '../websocket';
import { transform } from './helpers';
import { SettlementSource } from './types';

export class Settlement {
  constructor(private readonly ws: Websocket) {}

  settlement$(pair?: string | string[]): Observable<SettlementResponse> {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.Settlement});

    return this.ws.subscribe<SettlementSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopSettlement(pair?: string | string[]): void {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.Settlement});
    this.ws.unsubscribe(channel);
  }
}
