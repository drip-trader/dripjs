import { sleep } from '@dripjs/common';
import { testnetConfig } from '@dripjs/testing';

import { Position } from '../../rest/internal/private/position';
import { RestPositionsResponse } from '../../rest/types';
import { OrderSide, PositionResponse } from '../../types';

/**
 * 创建新仓位后,执行特定方法,之后自动清除仓位。
 * @param posiOptions
 * @param handler
 */
export const receivePositionData = async <T>(
  posiOptions: {
    symbol: string;
    side: OrderSide;
    amount: number;
  },
  handler: (positions: PositionResponse[]) => any = () => {},
): Promise<T> => {
  const position = new Position(testnetConfig);
  const createdPosition = (await position.create(posiOptions.symbol, posiOptions.side, posiOptions.amount)) as RestPositionsResponse;
  const result = await handler(createdPosition.data);
  await sleep(500);
  await position.remove(posiOptions.symbol);

  return result;
};
