import { Timestamp } from '@dripjs/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';

@Entity({
  name: 'ticker',
})
export class TickerEntity {
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
    type: 'decimal',
    name: 'ask',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly ask!: string;

  @Column({
    type: 'decimal',
    name: 'bid',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly bid!: string;

  @Column({
    type: 'decimal',
    name: 'open',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly open!: string;

  @Column({
    type: 'decimal',
    name: 'high',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly high!: string;

  @Column({
    type: 'decimal',
    name: 'low',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly low!: string;

  @Column({
    type: 'decimal',
    name: 'last',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly last!: string;

  @Column({
    type: 'decimal',
    name: 'volume',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly volume!: string;

  @Column({
    type: 'datetime',
    name: 'time',
    precision: 3,
    transformer: nullableDateTransformer,
  })
  readonly time!: Timestamp;

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
