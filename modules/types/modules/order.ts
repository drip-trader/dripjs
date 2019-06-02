export enum OrderStatus {
  New = 'New',
  Filled = 'Filled',
  Rejected = 'Rejected',
  PartiallyFilled = 'PartiallyFilled',
  Canceled = 'Canceled',
}

export enum OrderSide {
  Buy = 'buy',
  Sell = 'sell',
}

export type Nominal<T, Name extends string> = T & {
  [Symbol.species]: Name;
};

/**
 * timestamp
 * eg: 1535600337261
 */
export type Timestamp = Nominal<number, 'Timestamp'>;
export type BigNumberString = Nominal<string, 'BigNumberString'>;
