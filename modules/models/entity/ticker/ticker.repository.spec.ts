import { fixByDigits } from '@dripjs/common';
import { TickerEntity, TickerEntityCreateParams, TickerRepository } from '@dripjs/models';
import { Timestamp } from '@dripjs/types';

import { getTickerDefaultData } from '../../common/testing/data/models';
import { EntityTestBed } from '../../common/testing/entity-test-bed';

describe('ticker.repository', () => {
  let tickerReposity: TickerRepository;
  const defaultData = getTickerDefaultData();
  const exchange = 'bitmex';
  const pair = 'xbtusd';

  beforeAll(async () => {
    await EntityTestBed.setup();
    tickerReposity = EntityTestBed.getRepository(TickerRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await tickerReposity.insertNewTickers(defaultData);
  });

  describe('insertNewTicker', () => {
    it('should insert new ticker', async () => {
      const newData = {
        ...defaultData[0],
        exchange: 'bitbank',
        time: Date.now() as Timestamp,
      };
      await tickerReposity.insertNewTicker(newData);
      const insertedTicker = await tickerReposity.find({
        exchange: newData.exchange,
      });
      expect(insertedTicker.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('insertNewTickers', () => {
    it('should insert new Tickers', async () => {
      const insertedTickers = await tickerReposity.find();
      expect(insertedTickers.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('getTickers', () => {
    it('should get tickers', async () => {
      const res = await tickerReposity.getTickers(exchange, pair);
      expect([getDataFromEntity(res[0])]).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(entity: TickerEntity): TickerEntityCreateParams {
  return {
    exchange: entity.exchange,
    symbol: entity.symbol,
    time: entity.time,
    ask: fixByDigits(entity.ask, 0),
    bid: fixByDigits(entity.bid, 0),
    open: fixByDigits(entity.open, 0),
    high: fixByDigits(entity.high, 0),
    low: fixByDigits(entity.low, 0),
    last: fixByDigits(entity.last, 0),
    volume: fixByDigits(entity.volume, 0),
  };
}
