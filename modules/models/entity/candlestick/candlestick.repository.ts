import { Timestamp } from '@dripjs/types';
import { EntityRepository, Repository } from 'typeorm';

import { CandlestickEntity } from './candlestick.entity';

export interface CandlestickEntityCreateParams {
  exchange: CandlestickEntity['exchange'];
  symbol: CandlestickEntity['symbol'];
  period: CandlestickEntity['period'];
  time: CandlestickEntity['time'];
  open: CandlestickEntity['open'];
  high: CandlestickEntity['high'];
  low: CandlestickEntity['low'];
  close: CandlestickEntity['close'];
  volume: CandlestickEntity['volume'];
}

@EntityRepository(CandlestickEntity)
export class CandlestickRepository extends Repository<CandlestickEntity> {
  async insertNewCandlestick(params: CandlestickEntityCreateParams): Promise<CandlestickEntity> {
    return this.save(params as CandlestickEntity, { reload: false });
  }

  async insertNewCandlesticks(params: CandlestickEntityCreateParams[]): Promise<CandlestickEntity[]> {
    return this.save(params as CandlestickEntity[], { reload: false });
  }

  async getCandlesticks(exchange: string, symbol: string): Promise<CandlestickEntity[]> {
    return this.find({ where: { exchange, symbol } });
  }
}
