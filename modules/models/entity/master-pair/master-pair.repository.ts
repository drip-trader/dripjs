import { EntityRepository, Repository } from 'typeorm';

import { MasterPairEntity } from './master-pair.entity';

export interface MasterPairEntityCreateParams {
  exchange: MasterPairEntity['exchange'];
  name: MasterPairEntity['name'];
  baseAsset: MasterPairEntity['baseAsset'];
  quoteAsset: MasterPairEntity['quoteAsset'];
  amountPrecision: MasterPairEntity['amountPrecision'];
  pricePrecision: MasterPairEntity['pricePrecision'];
  maxOrderAmount: MasterPairEntity['maxOrderAmount'];
  maxOrderPrice: MasterPairEntity['maxOrderPrice'];
  isEnabled: MasterPairEntity['isEnabled'];
}

export interface PairPrecision {
  amountPrecision: MasterPairEntity['amountPrecision'];
  pricePrecision: MasterPairEntity['pricePrecision'];
}

@EntityRepository(MasterPairEntity)
export class MasterPairRepository extends Repository<MasterPairEntity> {
  async findByPair(pair: string): Promise<MasterPairEntity | undefined> {
    return this.findOne({ where: { name: pair } });
  }

  async insertNewPair(params: MasterPairEntityCreateParams): Promise<MasterPairEntity> {
    return this.save(params as MasterPairEntity, { reload: false });
  }

  async insertNewPairs(params: MasterPairEntityCreateParams[]): Promise<MasterPairEntity[]> {
    return this.save(params as MasterPairEntity[], { reload: false });
  }

  async getPrecisionByPair(pair: string): Promise<PairPrecision> {
    const rs = await this.createQueryBuilder()
      .select('price_precision', 'pricePrecision')
      .addSelect('amount_precision', 'amountPrecision')
      .where({ name: pair })
      .limit(1)
      .execute();

    return rs && rs.length > 0 ? rs[0] : { amountPrecision: 0, pricePrecision: 0 };
  }

  async getPair(): Promise<MasterPairEntity[]> {
    return this.find({ where: { isEnabled: true } });
  }

  async getPairNames(): Promise<string[]> {
    const rs: { name: string }[] = await this.createQueryBuilder()
      .select('name')
      .execute();

    return rs.map((record) => record.name);
  }
}
