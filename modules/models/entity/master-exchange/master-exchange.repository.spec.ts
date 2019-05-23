import { MasterExchangeEntity, MasterExchangeEntityCreateParams, MasterExchangeRepository } from '@dripjs/models';

import { getExchangeDefaultData } from '../../common/testing/data/models';
import { EntityTestBed } from '../../common/testing/entity-test-bed';

describe('master-exchange.repository', () => {
  let masterExchangeReposity: MasterExchangeRepository;
  const defaultData = getExchangeDefaultData();
  const exchange = 'bitmex';

  beforeAll(async () => {
    await EntityTestBed.setup();
    masterExchangeReposity = EntityTestBed.getRepository(MasterExchangeRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await masterExchangeReposity.insertNewExchanges(defaultData);
  });

  describe('insertNewExchange', () => {
    it('should insert new exchange', async () => {
      const newData = {
        ...defaultData[0],
        name: 'bitbank',
      };
      await masterExchangeReposity.insertNewExchange(newData);
      const insertedExchange = await masterExchangeReposity.find({
        name: newData.name,
      });
      expect(insertedExchange.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('insertNewExchanges', () => {
    it('should insert new Exchanges', async () => {
      const insertedExchange = await masterExchangeReposity.find();
      expect(insertedExchange.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('findByName', () => {
    it('should find by name', async () => {
      const existed = await masterExchangeReposity.findByName(exchange);
      expect(existed).toBeDefined();
      expect(getDataFromEntity(existed!)).toEqual(defaultData[0]);
    });
  });

  describe('getExchanges', () => {
    it('should get exchanges', async () => {
      const exInfo = await masterExchangeReposity.getExchanges();
      expect([getDataFromEntity(exInfo[0])]).toEqual(defaultData);
    });
  });

  describe('getExchangeNames', () => {
    it('should get exchange names', async () => {
      const exNames = await masterExchangeReposity.getExchangeNames();
      expect(exNames).toEqual(defaultData.map((o) => o.name));
    });
  });
});

function getDataFromEntity(entity: MasterExchangeEntity): MasterExchangeEntityCreateParams {
  return {
    name: entity.name,
    type: entity.type,
  };
}
