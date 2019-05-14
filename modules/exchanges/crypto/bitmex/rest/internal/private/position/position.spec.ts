import { isPositive } from '@dripjs/common';
import { testnetConfig } from '@dripjs/testing';

import { assertExisitingColumns, overrideTimestampColumns, overrideValue } from '../../../../common/test-helpers';
import { OrderSide } from '../../../../types';
import { Position } from './position';

describe('Bitmex RestInsider Position', () => {
  const pair = 'XBTUSD';
  const amount = 25;
  let position: Position;

  beforeAll(async () => {
    position = new Position(testnetConfig);
  });

  it('create position', async () => {
    const side = OrderSide.Buy;
    const res = await position.create(pair, side, amount);
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: 300,
        },
        orders: [
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
        error: undefined,
      }),
    ).not.toThrow();
  });

  it('fetch position', async () => {
    const res = await position.fetch({
      filter: {
        symbol: pair,
      },
    });
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: 300,
        },
        orders: [
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
        error: undefined,
      }),
    ).not.toThrow();
  });

  it('remove position', async () => {
    const res = await position.remove(pair);
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: 300,
        },
        orders: [
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
        error: undefined,
      }),
    ).not.toThrow();
  });
});
