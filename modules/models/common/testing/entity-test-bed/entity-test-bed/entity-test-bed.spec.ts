import { overrideTimestampColumns } from '../../test-helpers';
import { MasterPairEntity, MasterSpotPairRepository } from '@dripjs/models';

import { DatabaseSnapshot, EntityTestBed, getLatestUpdatedTime } from './entity-test-bed';

const createBase = {
  ask: '10',
  bid: '20',
  last: '30',
  spotEventId: '1',
};

const expectedBase = {
  ask: '10',
  bid: '20',
  createdAt: 'overridden',
  last: '30',
  spotEventId: '1',
  updatedAt: 'overridden',
};

describe('EntityTestBed', () => {
  beforeAll(async () => {
    await EntityTestBed.setup();
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
  });

  describe('getManager', () => {
    it('should get manager of core and public database', async () => {
      const manager = EntityTestBed.getManager();
      expect(manager).toBeTruthy();
    });
  });

  describe('getRepository', () => {
    it('should get custom repository of database', async () => {
      const repository = EntityTestBed.getRepository(MasterPairEntity);
      expect(repository instanceof MasterSpotPairRepository).toBe(true);
    });
  });
/*
  describe('createEntity', () => {
    describe('When one argument (use class)', () => {
      it('should create single instance', async () => {
        const created = await EntityTestBed.createEntity(ExchangeInformationEntity, {
          ...createBase,
          pair: 'btc_jpy',
        });

        expect(overrideTimestampColumns(created)).toEqual({
          ...expectedBase,
          id: '1',
          pair: 'btc_jpy',
        });
      });
    });

    describe('When one argument (use entity name string)', () => {
      it('should create single instance', async () => {
        const created = await EntityTestBed.createEntity(ExchangeInformationEntity.name, {
          ...createBase,
          pair: 'btc_jpy',
        });

        expect(overrideTimestampColumns(created)).toEqual({
          ...expectedBase,
          id: '1',
          pair: 'btc_jpy',
        });
      });
    });

    describe('When multiple arguments', () => {
      it('should create multiple instances', async () => {
        const created = await EntityTestBed.createEntity(ExchangeInformationEntity, [
          {
            ...createBase,
            pair: 'btc_jpy',
          },
          {
            ...createBase,
            pair: 'xrp_jpy',
          },
        ]);

        expect(overrideTimestampColumns(created)).toEqual([
          {
            ...expectedBase,
            id: '1',
            pair: 'btc_jpy',
          },
          {
            ...expectedBase,
            id: '2',
            pair: 'xrp_jpy',
          },
        ]);
      });
    });

    describe('When lacking params', () => {
      it('should throw error', async () => {
        await expect(
          EntityTestBed.createEntity(ExchangeInformationEntity, {
            // pair is lacking
            ...createBase,
          }),
        ).rejects.toBeTruthy();
      });
    });

    describe('When argument has function', () => {
      it('should create single instance with function executed result', async () => {
        const created = await EntityTestBed.createEntity(ExchangeInformationEntity, {
          ...createBase,
          pair: () => 'this is result of function',
        });

        expect(overrideTimestampColumns(created)).toEqual({
          ...expectedBase,
          id: '1',
          pair: 'this is result of function',
        });
      });
    });
  });

  describe('assertEntity', () => {
    it('should not throw error', async () => {
      const created = await EntityTestBed.createEntity(ExchangeInformationEntity, {
        ...createBase,
        pair: 'btc_jpy',
      });
      const expectation = {
        ...expectedBase,
        id: '1',
        pair: 'btc_jpy',
        createdAt: (value: any) => Number.isSafeInteger(value),
        updatedAt: (value: any) => Number.isSafeInteger(value),
      };

      expect(() => EntityTestBed.assertEntity(created, expectation)).not.toThrow();
    });

    it('should throw error', async () => {
      const created = await EntityTestBed.createEntity(ExchangeInformationEntity, {
        ...createBase,
        pair: 'bad name',
      });
      const expectation = {
        id: '2',
      };

      expect(() => EntityTestBed.assertEntity(created, expectation)).toThrow();
    });
  });

  describe('assertDatabase', () => {
    // EntityTestBed.assertDatabase() returns <Promise<undefined>>
    const valueWhenAssertIsOK = undefined;
    let e1: ExchangeInformationEntity;
    let e2: ExchangeInformationEntity;
    let snapshot: DatabaseSnapshot;

    beforeEach(async () => {
      await EntityTestBed.clear();
      [e1, e2] = await EntityTestBed.createEntity(ExchangeInformationEntity, [
        {
          ...createBase,
          pair: 'btc_jpy',
        },
        {
          ...createBase,
          pair: 'xrp_jpy',
        },
      ]);
      snapshot = await EntityTestBed.getCoreDatabaseSnapshot();
    });

    describe('When create assertion', () => {
      beforeEach(async () => {
        await EntityTestBed.createEntity(ExchangeInformationEntity, [
          {
            ...createBase,
            pair: 'ltc_jpy',
          },
          {
            ...createBase,
            pair: 'eth_jpy',
          },
        ]);
      });

      describe('When count is used', () => {
        describe('And when count matches', () => {
          it('should not throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  created: {
                    count: 2,
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  created: {
                    count: (n) => 2 <= n,
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
          });
        });

        describe('And when count mismatches', () => {
          it('should throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  created: {
                    count: 1,
                  },
                },
              }),
            ).rejects.toBeTruthy();
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  created: {
                    count: (n) => 3 <= n,
                  },
                },
              }),
            ).rejects.toBeTruthy();
          });
        });
      });

      describe('When all expectations satisfy condition', () => {
        it('should not throw error', async () => {
          await expect(
            EntityTestBed.assertDatabase(snapshot, {
              [ExchangeInformationEntity.name]: {
                created: {
                  assertion: [
                    { id: (v: any) => Number.isInteger(+v), pair: 'ltc_jpy' },
                    { id: (v: any) => Number.isInteger(+v), pair: 'eth_jpy' },
                  ],
                },
              },
            }),
          ).resolves.toBe(valueWhenAssertIsOK);
        });
      });

      describe('When any expectations does not satisfy condition', () => {
        it('should throw error', async () => {
          await expect(
            EntityTestBed.assertDatabase(snapshot, {
              [ExchangeInformationEntity.name]: {
                created: {
                  assertion: [{ pair: 'ltc_jpy' }, { pair: 'bad name' }],
                },
              },
            }),
          ).rejects.toBeTruthy();
        });
      });

      describe('When update assertion', () => {
        beforeEach(async () => {
          (<any>e1).pair = 'updated name 1';
          (<any>e2).pair = 'updated name 2';
          await EntityTestBed.getManager(ExchangeInformationEntity).save(ExchangeInformationEntity, [e1, e2]);
        });

        describe('When count is used', () => {
          describe('And when count matches', () => {
            it('should not throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    updated: {
                      count: 2,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    updated: {
                      count: (n) => 2 <= n,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
            });
          });

          describe('And when count mismatches', () => {
            it('should throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    updated: {
                      count: 1,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    updated: {
                      count: (n) => 3 <= n,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
            });
          });
        });

        describe('When all expectations satisfy condition', () => {
          it('should not throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  updated: {
                    assertion: [
                      [{ id: '1', pair: 'btc_jpy' }, { id: '1', pair: 'updated name 1' }],
                      [{ id: '2', pair: 'xrp_jpy' }, { id: '2', pair: 'updated name 2' }],
                    ],
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
          });
        });

        describe('When any expectation does not satisfy condition', () => {
          it('should throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  updated: {
                    assertion: [
                      [{ id: '1', pair: 'btc_jpy' }, { id: '1', name: 'updated name 1' }],
                      [{ id: '2', pair: 'xrp_jpy' }, { id: '2', name: 'bad name' }],
                    ],
                  },
                },
              }),
            ).rejects.toBeTruthy();
          });
        });
      });

      describe('When delete assertion', () => {
        beforeEach(async () => {
          await EntityTestBed.getManager(ExchangeInformationEntity).remove(ExchangeInformationEntity, [{ id: '1' }, { id: '2' }]);
        });

        describe('When count is used', () => {
          describe('And when count matches', () => {
            it('should not throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    deleted: {
                      count: 2,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    deleted: {
                      count: (n) => 2 <= n,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
            });
          });

          describe('And when count mismatches', () => {
            it('should throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    deleted: {
                      count: 3,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [ExchangeInformationEntity.name]: {
                    deleted: {
                      count: (n) => 3 <= n,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
            });
          });
        });

        describe('When all expectations satisfy condition', () => {
          it('should not throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  deleted: {
                    assertion: [{ id: '1', pair: 'btc_jpy' }, { id: '2', pair: 'xrp_jpy' }],
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
          });
        });

        describe('When any expectations does not satisfy condition', () => {
          it('should throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [ExchangeInformationEntity.name]: {
                  deleted: {
                    assertion: [{ id: '1', name: 'name 1', uuid: 'uuid 1' }, { id: 'bad id' }],
                  },
                },
              }),
            ).rejects.toBeTruthy();
          });
        });
      });
    });
  });
});

describe('getLatestUpdatedTime', () => {
  describe('When no records', () => {
    it('should return 0', () => {
      expect(getLatestUpdatedTime([])).toBe(0);
    });
  });

  describe('When max is value of createdAt', () => {
    it('should get max value', () => {
      expect(
        getLatestUpdatedTime([
          { id: '1', createdAt: 1, updatedAt: 1 },
          { id: '2', createdAt: 2, updatedAt: 1 },
          { id: '3', createdAt: 3, updatedAt: 1 },
        ]),
      ).toBe(3);
    });
  });

  describe('When max is value of updatedAt', () => {
    it('should get max value', () => {
      expect(
        getLatestUpdatedTime([
          { id: '1', createdAt: 1, updatedAt: 3 },
          { id: '2', createdAt: 1, updatedAt: 2 },
          { id: '3', createdAt: 1, updatedAt: 1 },
        ]),
      ).toBe(3);
    });
  });*/
});
