import { sleep } from '../../../../../../common';
import { isPositive } from '../../../../../../common/big-number-util';
import { testnetConfig } from '../../../../common';
import { assertExisitingColumns, overrideTimestampColumns, overrideValue, receivePositionData } from '../../../../common/test-helpers';
import { OrderSide, PositionResponse } from '../../../../types';
import { WebsocketInsider } from '../../websocket-insider';
import { Position } from './position';

describe('BitmexWS private position', () => {
  let position: Position;
  const websocketInsider = new WebsocketInsider(testnetConfig);
  const pair = 'XBTUSD';
  const amount = 25;

  async function createPositionData(
    posiOpts?: {
      symbol: string;
      side: OrderSide;
      amount: number;
    },
    handler?: () => void,
  ): Promise<void> {
    await receivePositionData(
      posiOpts
        ? posiOpts
        : {
            symbol: pair,
            side: OrderSide.Buy,
            amount,
          },
      handler ? () => handler : () => {},
    );
  }

  beforeAll(() => {
    position = new Position(websocketInsider);
  });
  afterAll(() => {
    websocketInsider.destroy();
  });

  afterEach(async () => {
    position.stopPosition();
    await sleep(1000);
  });

  it('subscribe open position', async () => {
    position.position$(pair).subscribe((o) => {
      console.log(`position$: ${JSON.stringify(o)}`);
    });
    position.openPosition$(pair).subscribe((o) => {
      console.log(`openPosition$: ${JSON.stringify(o)}`);
    });
    await sleep(80000000);
  });

  it('subscribe position', async () => {
    const position$ = position.position$();
    const receiveList: PositionResponse[][] = [[]];
    const subscription = position$.subscribe((o) => {
      receiveList.push(o);
    });
    await createPositionData(undefined, () => subscription.unsubscribe());
    const res = receiveList[receiveList.length - 1].filter((o) => o.symbol === pair);
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(res), [
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
      ]),
    ).not.toThrow();
  });

  it.skip('subscribe position with single pair', async () => {
    const position$ = position.position$(pair);
    const receiveList: PositionResponse[][] = [[]];
    const subscription = position$.subscribe((o) => {
      receiveList.push(o);
    });
    await createPositionData(undefined, () => subscription.unsubscribe());
    const receiveData = receiveList[receiveList.length - 1];
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(receiveData), [
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
      ]),
    ).not.toThrow();
  });

  // TODO 指定多交易商品出错，（只有XBTUSD)
  it.skip('subscribe position with multiple pair', async () => {
    const pair2 = 'ETHXBT';
    const position$ = position.position$([pair, pair2]);
    const receiveList: PositionResponse[][] = [[]];
    const subscription = position$.subscribe((o) => {
      receiveList.push(o);
    });
    const posiOpts = {
      symbol: pair2,
      side: OrderSide.Buy,
      amount: 1,
    };
    await createPositionData(undefined, () => subscription.unsubscribe());
    await createPositionData(posiOpts, () => subscription.unsubscribe());
    const receiveData = receiveList[receiveList.length - 1];
    expect(() =>
      assertExisitingColumns(overrideTimestampColumns(receiveData), [
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
      ]),
    ).not.toThrow();
  });
});
