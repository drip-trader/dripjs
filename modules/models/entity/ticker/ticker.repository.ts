import { EntityRepository, Repository } from 'typeorm';

import { TickerEntity } from './ticker.entity';

export interface TickerEntityCreateParams {
  exchange: TickerEntity['exchange'];
  symbol: TickerEntity['symbol'];
  ask: TickerEntity['ask'];
  bid: TickerEntity['bid'];
  time: TickerEntity['time'];
  open: TickerEntity['open'];
  high: TickerEntity['high'];
  low: TickerEntity['low'];
  last: TickerEntity['last'];
  volume: TickerEntity['volume'];
}

@EntityRepository(TickerEntity)
export class TickerRepository extends Repository<TickerEntity> {
  async insertNewTicker(params: TickerEntityCreateParams): Promise<TickerEntity> {
    return this.save(params as TickerEntity, { reload: false });
  }

  async insertNewTickers(params: TickerEntityCreateParams[]): Promise<TickerEntity[]> {
    return this.save(params as TickerEntity[], { reload: false });
  }

  async getTickers(exchange: string, symbol: string): Promise<TickerEntity[]> {
    return this.find({ where: { exchange, symbol } });
  }
}
