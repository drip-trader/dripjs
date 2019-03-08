import { Exchange, Timestamp } from '@dripjs/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { nullableBooleanTinyintTransformer, nullableDateTransformer } from '../../common';

@Entity({
  name: 'master_exchange',
})
export class MasterExchangeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    unsigned: true,
    comment: 'primary auto generated id',
  })
  readonly id!: string;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 20,
    comment: 'special exchange name',
  })
  readonly name!: Exchange['name'];

  @Column({
    type: 'varchar',
    name: 'type',
    length: 10,
    comment: 'exchange type',
  })
  readonly type!: Exchange['type'];

  @Column({
    type: 'tinyint',
    name: 'is_enabled',
    unsigned: true,
    width: 1,
    comment: 'whether exchange is enable status',
    default: '1',
    transformer: nullableBooleanTinyintTransformer,
  })
  readonly isEnabled!: Exchange['isEnabled'];

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
