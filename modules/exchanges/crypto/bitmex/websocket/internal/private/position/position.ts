import { Observable } from 'rxjs';

import { getChannelName } from '../../../../common';
import { PositionResponse } from '../../../../types';
import { PrivateEndPoints } from '../../../types';
import { transformSourceData } from '../../utils';
import { WebsocketInsider } from '../../websocket-insider';
import { transform } from './helpers';

export class Position {
  constructor(private readonly ws: WebsocketInsider) {}

  position$(pair?: string | string[]): Observable<PositionResponse[]> {
    const channel = getChannelName({ pair, endPoint: PrivateEndPoints.Position });

    return transformSourceData({
      source$: this.ws.subscribe<PositionResponse>(channel),
      transform,
    });
  }

  stopPosition(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: PrivateEndPoints.Position });
    this.ws.unsubscribe(channel);
  }
}
