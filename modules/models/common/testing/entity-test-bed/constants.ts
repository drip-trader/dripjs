import { ObjectType } from 'typeorm';

import {
  CandlestickEntity,
  CandlestickRepository,
  MasterExchangeEntity,
  MasterExchangeRepository,
  MasterPairEntity,
  MasterPairRepository,
  OrderbookEntity,
  OrderbookRepository,
  TransactionEntity,
  TransactionRepository,
} from '../../../entity';

export const allEntityTypes: ObjectType<any>[] = [
  MasterPairEntity,
  MasterExchangeEntity,
  OrderbookEntity,
  TransactionEntity,
  CandlestickEntity,
];

export const allRepositoryTypes: ObjectType<any>[] = [
  MasterPairRepository,
  MasterExchangeRepository,
  OrderbookRepository,
  TransactionRepository,
  CandlestickRepository,
];
