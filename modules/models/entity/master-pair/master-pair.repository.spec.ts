import { MasterPairEntity, MasterPairEntityCreateParams, MasterPairRepository } from '@dripjs/models';

import { getPairDefaultData } from '../../common/testing/data/models';
import { EntityTestBed } from '../../common/testing/entity-test-bed';

describe('master-pair.repository', () => {
  let masterPairReposity: MasterPairRepository;
  const defaultData = getPairDefaultData();
  const exchange = 'bitmex';
  const pair = 'xbtusd';

  beforeAll(async () => {
    await EntityTestBed.setup();
    masterPairReposity = EntityTestBed.getRepository(MasterPairRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await masterPairReposity.insertNewPairs(defaultData);
  });

  describe('insertNewPair', () => {
    it('should insert new pair', async () => {
      const newData = {
        ...defaultData[0],
        name: 'ethusd',
        quoteAsset: 'usd',
        baseAsset: 'eth',
      };
      await masterPairReposity.insertNewPair(newData);
      const insertedPairs = await masterPairReposity.find({
        name: newData.name,
      });
      expect(insertedPairs.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('insertNewPairs', () => {
    it('should insert new pairs', async () => {
      const insertedPairs = await masterPairReposity.find();
      expect(insertedPairs.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('findByPair', () => {
    it('should find by pair', async () => {
      const existed = await masterPairReposity.findByPair(pair);
      expect(existed).toBeDefined();
      expect(getDataFromEntity(existed!)).toEqual(defaultData[0]);
    });
  });

  describe('getPair', () => {
    it('should get pair', async () => {
      const pairInfo = await masterPairReposity.getPairs(exchange);
      expect([getDataFromEntity(pairInfo[0])]).toEqual(defaultData);
    });
  });

  describe('getPairNames', () => {
    it('should get pair names', async () => {
      const pairNames = await masterPairReposity.getPairNames(exchange);
      expect(pairNames).toEqual(defaultData.map((o) => o.name));
    });
  });

  describe('getPrecisionByPair', () => {
    it('should get precision by pair', async () => {
      const prec = await masterPairReposity.getPrecisionByPair(pair);
      expect(prec).toEqual({ pricePrecision: 1, amountPrecision: 0 });
    });
  });
});

function getDataFromEntity(entity: MasterPairEntity): MasterPairEntityCreateParams {
  return {
    exchange: entity.exchange,
    name: entity.name,
    baseAsset: entity.baseAsset,
    quoteAsset: entity.quoteAsset,
    amountPrecision: entity.amountPrecision,
    pricePrecision: entity.pricePrecision,
    maxOrderAmount: entity.maxOrderAmount,
    maxOrderPrice: entity.maxOrderPrice,
  };
}
