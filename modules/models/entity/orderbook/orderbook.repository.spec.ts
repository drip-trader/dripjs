import { EntityTestBed, OrderbookEntity, OrderbookEntityParams, OrderbookRepository } from '@dripjs/models';
import { getOrderbookDefaultData } from '@dripjs/testing';
import { Timestamp } from '@dripjs/types';

describe('orderbook.repository', () => {
  let orderbookReposity: OrderbookRepository;
  const defaultData = getOrderbookDefaultData();
  const exchange = 'bitmex';
  const pair = 'xbtusd';

  beforeAll(async () => {
    await EntityTestBed.setup();
    orderbookReposity = EntityTestBed.getRepository(OrderbookRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await orderbookReposity.insertNewOrderbooks(defaultData);
  });

  describe('insertNewOrderbook', () => {
    it('should insert new orderbook', async () => {
      const newData = {
        ...defaultData[0],
        exchange: 'bitbank',
        time: Date.now() as Timestamp,
      };
      await orderbookReposity.insertNewOrderbook(newData);
      const insertedOrderbook = await orderbookReposity.find({
        exchange: newData.exchange,
      });
      expect(insertedOrderbook.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('insertNewOrderbooks', () => {
    it('should insert new Orderbooks', async () => {
      const insertedOrderbooks = await orderbookReposity.find();
      expect(insertedOrderbooks.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('getOrderbooks', () => {
    it('should get orderbooks', async () => {
      const res = await orderbookReposity.getOrderbooks({ exchange, symbol: pair });
      expect([getDataFromEntity(res[0])]).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(entity: OrderbookEntity): OrderbookEntityParams {
  return {
    exchange: entity.exchange,
    symbol: entity.symbol,
    time: entity.time,
    data: entity.data,
  };
}
