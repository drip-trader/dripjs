import { Timestamp } from '@dripjs/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';

@Entity({
  name: 'transaction',
})
export class TransactionEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
    comment: 'transaction id',
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
    type: 'varchar',
    name: 'side',
    length: 4,
    comment: 'order side (buy or sell)',
  })
  readonly side!: string;

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 21,
    scale: 9,
    unsigned: true,
    comment: 'order price',
  })
  readonly price!: string;

  @Column({
    type: 'decimal',
    name: 'amount',
    precision: 21,
    scale: 9,
    unsigned: true,
    comment: 'order amount',
  })
  readonly amount!: string;

  @Column({
    type: 'datetime',
    name: 'created_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  /* istanbul ignore next */
  readonly createdAt!: Timestamp;

  @Column({
    type: 'datetime',
    name: 'updated_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    onUpdate: 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  /* istanbul ignore next */
  readonly updatedAt!: Timestamp;
}
