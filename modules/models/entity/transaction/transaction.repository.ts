import * as moment from 'moment';
import { EntityRepository, Repository } from 'typeorm';

import { TransactionEntity } from './transaction.entity';

export interface TransactionEntityCreateParams {
  exchange: TransactionEntity['exchange'];
  symbol: TransactionEntity['symbol'];
  time: TransactionEntity['time'];
  side: TransactionEntity['side'];
  price: TransactionEntity['price'];
  amount: TransactionEntity['amount'];
}

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {
  async insertNewTransaction(params: TransactionEntityCreateParams): Promise<TransactionEntity> {
    return this.save(params as TransactionEntity, { reload: false });
  }

  async insertNewTransactions(params: TransactionEntityCreateParams[]): Promise<TransactionEntity[]> {
    return this.save(params as TransactionEntity[], { reload: false });
  }

  async fetchByRange(exchange: string, symbol: string, startAt: moment.Moment, endAt: moment.Moment): Promise<TransactionEntity[]> {
    // DB created_at format: `2018-12-07 06:39:03.239`
    const timeFmt = `YYYY-MM-DD HH:mm:ss.SSS`;

    return this.createQueryBuilder()
      .where('exchange = :exchange and symbol = :symbol and created_at >= :startAt and created_at < :endAt')
      .orderBy('id', 'DESC')
      .setParameters({ exchange, symbol, startAt: startAt.format(timeFmt), endAt: endAt.format(timeFmt) })
      .getMany();
  }
}
