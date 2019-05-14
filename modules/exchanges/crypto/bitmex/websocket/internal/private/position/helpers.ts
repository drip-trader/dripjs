import { PositionResponse } from '../../../../types';
import { WebsocketData } from '../../websocket-insider';

/**
 * transform raw websocket data to OrderbookL2Response
 * @param source raw websocket data
 */
export function transform(source: WebsocketData<PositionResponse>): PositionResponse[] {
  return source.data;
}
