import { Pair, Timestamp } from '@dripjs/types';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { getFloorByDigitsTransformer, nullableBooleanTinyintTransformer, nullableDateTransformer } from '../../common';

@Entity({
  name: 'master_pair',
})
@Index('unique_base_asset_quote_asset', ['baseAsset', 'quoteAsset'], { unique: true })
export class MasterPairEntity {
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
    comment: 'special pair name',
  })
  readonly name!: Pair['name'];

  @Column({
    type: 'varchar',
    name: 'exchange',
    length: 20,
    comment: 'exchange name of special pair',
  })
  readonly exchange!: Pair['exchange'];

  @Column({
    type: 'varchar',
    name: 'base_asset',
    length: 10,
    comment: 'base asset name',
  })
  readonly baseAsset!: Pair['baseAsset'];

  @Column({
    type: 'varchar',
    name: 'quote_asset',
    length: 10,
    comment: 'quote asset name',
  })
  readonly quoteAsset!: Pair['quoteAsset'];

  @Column({
    type: 'int',
    name: 'price_precision',
    unsigned: true,
    comment: 'pair price precision',
  })
  readonly pricePrecision!: Pair['pricePrecision'];

  @Column({
    type: 'int',
    name: 'amount_precision',
    unsigned: true,
    comment: 'pair amount precision',
  })
  readonly amountPrecision!: Pair['amountPrecision'];

  @Column({
    type: 'decimal',
    name: 'min_order_amount',
    precision: 21,
    scale: 9,
    unsigned: true,
    comment: 'min Order amount',
    default: /* istanbul ignore next */ () => '0.0',
    transformer: getFloorByDigitsTransformer(9),
  })
  readonly minOrderAmount!: Pair['minOrderAmount'];

  @Column({
    type: 'int',
    name: 'max_order_amount',
    unsigned: true,
    comment: 'max Order amount',
  })
  readonly maxOrderAmount!: Pair['maxOrderAmount'];

  @Column({
    type: 'decimal',
    name: 'min_order_price',
    precision: 21,
    scale: 9,
    unsigned: true,
    comment: 'min Order price',
    default: /* istanbul ignore next */ () => '0.0',
    transformer: getFloorByDigitsTransformer(9),
  })
  readonly minOrderPrice!: Pair['minOrderPrice'];

  @Column({
    type: 'int',
    name: 'max_order_price',
    unsigned: true,
    comment: 'max Order price',
  })
  readonly maxOrderPrice!: Pair['maxOrderPrice'];

  @Column({
    type: 'tinyint',
    name: 'is_enabled',
    unsigned: true,
    width: 1,
    comment: 'whether pair is enable status',
    default: '1',
    transformer: nullableBooleanTinyintTransformer,
  })
  readonly isEnabled!: Pair['isEnabled'];

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
