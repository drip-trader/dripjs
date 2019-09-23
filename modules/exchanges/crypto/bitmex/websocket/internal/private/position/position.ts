import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { getChannelName } from '../../../../common';
import { PositionResponse } from '../../../../types';
import { WsPrivateEndPoints } from '../../../types';
import { transformSourceData } from '../../utils';
import { WebsocketInsider } from '../../websocket-insider';
import { transform, update } from './helpers';

export class Position {
  constructor(private readonly ws: WebsocketInsider) {}

  position$(pair?: string | string[]): Observable<PositionResponse[]> {
    const channel = getChannelName({ pair, endPoint: WsPrivateEndPoints.Position });

    return transformSourceData({
      source$: this.ws.subscribe<PositionResponse>(channel),
      transform,
      update,
    });
  }

  openPosition$(pair?: string | string[]): Observable<PositionResponse[]> {
    return this.position$(pair).pipe(
      map((list) => list.filter((o) => o.isOpen)),
      filter((list) => list.length !== 0),
    );
  }

  stopPosition(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: WsPrivateEndPoints.Position });
    this.ws.unsubscribe(channel);
  }
}
