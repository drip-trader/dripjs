import { equalStrictly, isPositive } from '@dripjs/common';
import { EntityTestBed, TransactionEntityCreateParams, TransactionRepository } from '@dripjs/models';
import { getTransactionDefaultData } from '@dripjs/testing';
import { OrderSide, Timestamp } from '@dripjs/types';
import * as moment from 'moment';

describe('trade.repository', () => {
  let transactionReposity: TransactionRepository;
  const defaultData = getTransactionDefaultData();
  const exchange = 'bitmex';
  const pair = 'xbtusd';
  // for entity assertion
  const isTimestamp = isPositive;
  // to check value with ignoring precision. ('0.0001', '0.0001000')
  const isValueOf = (v1: any) => (v2: any) => equalStrictly(v1, v2);

  // fixture
  const btxFixture: TransactionEntityCreateParams = {
    exchange,
    symbol: pair,
    side: OrderSide.Sell,
    price: '1.0',
    amount: '1.293841200',
    time: Date.now() as Timestamp,
  };

  beforeAll(async () => {
    await EntityTestBed.setup();
    await EntityTestBed.clear();
    transactionReposity = EntityTestBed.getRepository(TransactionRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await transactionReposity.insertNewTransactions(defaultData);
  });

  describe('insertNewTransaction', () => {
    it('should insert new Transaction', async () => {
      const newData = {
        ...defaultData[0],
        exchange: 'bitbank',
        time: Date.now() as Timestamp,
      };
      await transactionReposity.insertNewTransaction(newData);
      const insertedTransaction = await transactionReposity.find({
        exchange: newData.exchange,
      });

      EntityTestBed.assertEntity(insertedTransaction[0], {
        id: '2',
        exchange: 'bitbank',
        symbol: pair,
        side: OrderSide.Buy,
        price: isValueOf(newData.price),
        amount: isValueOf(newData.amount),
        time: isTimestamp,
        createdAt: isTimestamp,
        updatedAt: isTimestamp,
      });
    });
  });

  describe('insertNewTransactions', () => {
    it('should insert new Transactions', async () => {
      const insertedTransactions = await transactionReposity.find();
      expect(
        insertedTransactions.map((getDataFromEntity) => {
          return {
            ...getDataFromEntity,
            amount: defaultData[0].amount,
            price: defaultData[0].price,
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          };
        }),
      ).toEqual(defaultData);
      expect(equalStrictly(insertedTransactions[0].amount, defaultData[0].amount));
      expect(equalStrictly(insertedTransactions[0].price, defaultData[0].price));
    });
  });

  describe('fetchByRange', () => {
    it('fetch transactions by pair & time should filter `[startAt, endAt)`', async () => {
      // insert btc_jpy, xrp_jpy transactions
      const startAt = moment('2019-12-09');
      const endAt = moment('2019-12-10');
      await transactionReposity.insertNewTransactions([
        {
          ...btxFixture,
          id: 2,
          createdAt: startAt.valueOf() as Timestamp,
        },
      ] as any[]);

      const trans = await transactionReposity.fetchByRange(exchange, pair, startAt, endAt);
      expect(trans.length).toBe(1);
      expect(trans[0].id).toBe('2');
    });
  });
});
