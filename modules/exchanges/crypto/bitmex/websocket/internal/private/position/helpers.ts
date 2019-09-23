import { PositionResponse } from '../../../../types';
import { WebsocketData } from '../../websocket-insider';

/**
 * transform raw websocket data to PositionResponse
 * @param source raw websocket data
 */
export function transform(source: WebsocketData<PositionResponse>): PositionResponse[] {
  return source.data;
}

export function update(
  originSource: WebsocketData<PositionResponse>,
  updateSource: WebsocketData<PositionResponse>,
): WebsocketData<PositionResponse> {
  const originData = originSource.data;
  const updateData = updateSource.data;

  originSource.data = originData;

  let currentPosition = 0;
  for (const updateItem of updateData) {
    const position = findPosition(originData, updateItem, currentPosition);
    if (originData[position]) {
      if (updateSource.action === 'update') {
        originData[position] = { ...originData[position], ...updateItem };
      } else if (updateSource.action === 'delete') {
        originData.splice(position, 1);
        currentPosition = position;
      }
    } else if (updateSource.action === 'insert') {
      // not found, insert to position
      originData.splice(position, 0, updateItem);
      currentPosition = position + 1;
    }
  }

  return originSource;
}

/**
 * find the first position in originSource that id larger or equal update account and symbol
 *
 * @param originSource
 * @param updateSource
 * @param fromId
 */
function findPosition(originSource: PositionResponse[], updateSource: PositionResponse, fromId: number): number {
  let i = fromId;
  for (; i < originSource.length; i++) {
    if (originSource[i].account === updateSource.account && originSource[i].symbol === updateSource.symbol) {
      break;
    }
  }

  return i;
}
