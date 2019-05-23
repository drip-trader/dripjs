import { isPositive } from '@dripjs/common';
import { assertExisitingColumns, overrideTimestampColumns, overrideValue, testnetConfig } from '@dripjs/testing';

import { OrderSide } from '../../../../types';
import { Position } from './position';

describe('Bitmex RestInsider Position', () => {
  const pair = 'XBTUSD';
  const amount = 25;
  let position: Position;

  beforeAll(async () => {
    position = new Position(testnetConfig);
    await position.removeAll();
  });

  afterAll(async () => {
    await position.removeAll();
  });

  it('create position', async () => {
    const side = OrderSide.Buy;
    const res = await position.create(pair, side, amount);
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: isPositive,
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
          limit: isPositive,
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
          limit: isPositive,
        },
        orders: [
          {
            account: isPositive,
            symbol: pair,
            leverage: isPositive,
            crossMargin: false,
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

  it('remove all position', async () => {
    await position.removeAll();
    const res = await position.fetch({ filter: { isOpen: true } });
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), {
        ratelimit: {
          remaining: isPositive,
          reset: overrideValue,
          limit: isPositive,
        },
        orders: [],
        error: undefined,
      }),
    ).not.toThrow();
  });
});
