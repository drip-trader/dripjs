import { Depth, Timestamp } from '@dripjs/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';

@Entity({
  name: 'orderbook',
})
export class OrderbookEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
    comment: 'primary auto generated id',
  })
  readonly id!: string;

  @Column({
    type: 'varchar',
    name: 'exchange',
    length: 20,
    comment: 'exchange name',
  })
  readonly exchange!: string;

  @Column({
    type: 'varchar',
    name: 'symbol',
    length: 20,
    comment: 'symbol name',
  })
  readonly symbol!: string;

  @Column({
    type: 'datetime',
    name: 'time',
    precision: 3,
    transformer: nullableDateTransformer,
  })
  readonly time!: Timestamp;

  @Column({
    type: 'json',
    name: 'data',
    comment: 'orderbook thin json data',
  })
  readonly data!: Depth;

  @Column({
    type: 'datetime',
    name: 'created_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  readonly createdAt!: Timestamp;

  @Column({
    type: 'datetime',
    name: 'updated_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    onUpdate: 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  readonly updatedAt!: Timestamp;
}
