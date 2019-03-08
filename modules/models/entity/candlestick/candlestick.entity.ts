import { Timestamp } from '@dripjs/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';

@Entity({
  name: 'candlestick',
})
export class CandlestickEntity {
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
    type: 'varchar',
    name: 'period',
    length: 10,
    comment: 'period type',
  })
  readonly period!: string;

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
    name: 'close',
    precision: 21,
    scale: 9,
    unsigned: true,
  })
  readonly close!: string;

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
