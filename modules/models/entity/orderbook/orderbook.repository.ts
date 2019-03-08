import { EntityRepository, Repository } from 'typeorm';

import { OrderbookEntity } from './orderbook.entity';

export interface OrderbookEntityParams {
  exchange: OrderbookEntity['exchange'];
  symbol: OrderbookEntity['symbol'];
  time: OrderbookEntity['time'];
  data: OrderbookEntity['data'];
}

@EntityRepository(OrderbookEntity)
export class OrderbookRepository extends Repository<OrderbookEntity> {
  async insertNewOrderbook(params: OrderbookEntityParams): Promise<OrderbookEntity> {
    return this.save(params as OrderbookEntity, { reload: false });
  }

  async insertNewOrderbooks(params: OrderbookEntityParams[]): Promise<OrderbookEntity[]> {
    return this.save(params as OrderbookEntity[], { reload: false });
  }

  async getOrderbooks(params: Partial<OrderbookEntityParams>): Promise<OrderbookEntity[]> {
    return this.find({ where: { params } });
  }
}
