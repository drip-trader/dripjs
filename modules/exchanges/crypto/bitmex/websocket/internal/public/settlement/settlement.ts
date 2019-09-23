import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getChannelName } from '../../../../common';
import { SettlementResponse } from '../../../../types';
import { WsPublicEndPoints } from '../../../types';
import { WebsocketInsider } from '../../websocket-insider';
import { transform } from './helpers';
import { SettlementSource } from './types';

export class Settlement {
  constructor(private readonly ws: WebsocketInsider) {}

  settlement$(pair?: string | string[]): Observable<SettlementResponse> {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.Settlement });

    return this.ws.subscribe<SettlementSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopSettlement(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.Settlement });
    this.ws.unsubscribe(channel);
  }
}
