import { isPositive } from '../../../../../../common/big-number-util';
import { testnetConfig } from '../../../../common';
import { assertExisitingColumns, overrideTimestampColumns, overrideValue } from '../../../../common/test-helpers';
import { MAX_REMAINING_NUM } from '../../../../constants';
import { OrderSide, ResponseType } from '../../../../types';
import { RestPositionsResponse } from '../../../types';
import { Position } from './position';

describe('Bitmex Rest Position', () => {
  const pair = 'XBTUSD';
  const amount = 25;
  let position: Position;

  beforeAll(async () => {
    position = new Position(testnetConfig);
  });

  it('create position', async () => {
    const side = OrderSide.Buy;
    const res = (await position.create(pair, side, amount)) as RestPositionsResponse;
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        type: ResponseType.Rest,
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: MAX_REMAINING_NUM,
        },
        data: [
          {
            account: isPositive,
            symbol: pair,
            leverage: isPositive,
            crossMargin: false,
            currentQty: amount,
            isOpen: true,
            markPrice: isPositive,
            lastPrice: isPositive,
            avgCostPrice: isPositive,
            avgEntryPrice: isPositive,
            marginCallPrice: isPositive,
            liquidationPrice: isPositive,
            bankruptPrice: isPositive,
            currentTimestamp: overrideValue,
            openingTimestamp: overrideValue,
            timestamp: overrideValue,
          },
        ],
      }),
    ).not.toThrow();
  });

  it('fetch position', async () => {
    const res = (await position.fetch({
      filter: {
        symbol: pair,
      },
    })) as RestPositionsResponse;
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        type: ResponseType.Rest,
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: MAX_REMAINING_NUM,
        },
        data: [
          {
            account: isPositive,
            symbol: pair,
            leverage: isPositive,
            crossMargin: false,
            currentQty: amount,
            isOpen: true,
            markPrice: isPositive,
            lastPrice: isPositive,
            avgCostPrice: isPositive,
            avgEntryPrice: isPositive,
            marginCallPrice: isPositive,
            liquidationPrice: isPositive,
            bankruptPrice: isPositive,
            currentTimestamp: overrideValue,
            openingTimestamp: overrideValue,
            timestamp: overrideValue,
          },
        ],
      }),
    ).not.toThrow();
  });

  it('remove position', async () => {
    const res = (await position.remove(pair)) as RestPositionsResponse;
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        type: ResponseType.Rest,
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: MAX_REMAINING_NUM,
        },
        data: [
          {
            account: isPositive,
            symbol: pair,
            leverage: isPositive,
            crossMargin: false,
            isOpen: false,
            markPrice: null,
            lastPrice: null,
            avgCostPrice: null,
            avgEntryPrice: null,
            marginCallPrice: null,
            liquidationPrice: null,
            bankruptPrice: null,
            currentTimestamp: overrideValue,
            openingTimestamp: overrideValue,
            timestamp: overrideValue,
          },
        ],
      }),
    ).not.toThrow();
  });
});
