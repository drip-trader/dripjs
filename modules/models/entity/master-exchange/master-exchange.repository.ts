import { EntityRepository, Repository } from 'typeorm';

import { MasterExchangeEntity } from './master-exchange.entity';

export interface MasterExchangeEntityCreateParams {
  name: MasterExchangeEntity['name'];
  type: MasterExchangeEntity['type'];
}

@EntityRepository(MasterExchangeEntity)
export class MasterExchangeRepository extends Repository<MasterExchangeEntity> {
  async findByName(name: string): Promise<MasterExchangeEntity | undefined> {
    return this.findOne({ where: { name } });
  }

  async insertNewExchange(params: MasterExchangeEntityCreateParams): Promise<MasterExchangeEntity> {
    return this.save(params as MasterExchangeEntity, { reload: false });
  }

  async insertNewExchanges(params: MasterExchangeEntityCreateParams[]): Promise<MasterExchangeEntity[]> {
    return this.save(params as MasterExchangeEntity[], { reload: false });
  }

  async getExchanges(): Promise<MasterExchangeEntity[]> {
    return this.find({ where: { isEnabled: true } });
  }

  async getExchangeNames(): Promise<string[]> {
    const rs: { name: string }[] = await this.createQueryBuilder()
      .select('name')
      .execute();

    return rs.map((record) => record.name);
  }
}
