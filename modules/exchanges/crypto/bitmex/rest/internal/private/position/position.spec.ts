import { isPositive } from '@dripjs/common';
import { assertExisitingColumns, overrideTimestampColumns, overrideValue, testnetConfig } from '@dripjs/testing';
import { Subject } from 'rxjs';

import { OrderSide } from '../../../../types';
import { Position } from './position';

describe('Bitmex Rest Position', () => {
  const pair = 'XBTUSD';
  const amount = 25;
  let position: Position;
  const remaining$ = new Subject<number>();

  beforeAll(async () => {
    position = new Position(testnetConfig, remaining$);
  });

  it('create position', (done) => {
    const side = OrderSide.Buy;
    position.create(pair, side, amount).subscribe((res) => {
      expect(() =>
        assertExisitingColumns(overrideTimestampColumns(res.data), [
          {
            account: isPositive,
            symbol: pair,
            leverage: isPositive,
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
        ]),
      ).not.toThrow();
      done();
    });
  });

  it('fetch position', (done) => {
    position
      .fetch({
        filter: {
          symbol: pair,
        },
      })
      .subscribe((res) => {
        expect(() =>
          assertExisitingColumns(overrideTimestampColumns(res.data), [
            {
              account: isPositive,
              symbol: pair,
              leverage: isPositive,
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
          ]),
        ).not.toThrow();
        done();
      });
  });

  it('update position leverage', (done) => {
    position
      .updateLeverage({
        symbol: pair,
        leverage: 4.15,
      })
      .subscribe((res) => {
        console.log(res);
        done();
      });
  });

  it('remove position', (done) => {
    position.remove(pair).subscribe((res) => {
      expect(() =>
        assertExisitingColumns(overrideTimestampColumns(res.data), [
          {
            account: isPositive,
            symbol: pair,
            leverage: isPositive,
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
        ]),
      ).not.toThrow();
      done();
    });
  });
});
