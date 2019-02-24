export enum BitmexOrderSide {
  Buy = 'Buy',
  Sell = 'Sell',
}

export enum BitmexOrderType {
  /**
   * The default order type. Specify an orderQty and price
   */
  Limit = 'Limit',
  /**
   * A traditional Market order
   */
  Market = 'Market',
  /**
   * A Stop Market order
   */
  Stop = 'Stop',
  /**
   * Like a Stop Market,
   * but enters a Limit order instead of a Market order.
   * Specify an orderQty, stopPx, and price.
   */
  StopLimit = 'StopLimit',
  /**
   * Similar to a Stop,
   * but triggers are done in the opposite direction.
   * Useful for Take Profit orders.
   */
  MarketIfTouched = 'MarketIfTouched',
  /**
   * As above; use for Take Profit Limit orders.
   */
  LimitIfTouched = 'LimitIfTouched',
}

/**
 * Execution Instructions
 * If using multiple, separate with a comma (e.g. LastPrice,Close).
 */
export enum BitmexExecInst {
  ParticipateDoNotInitiate = 'ParticipateDoNotInitiate',
  MarkPrice = 'MarkPrice',
  LastPrice = 'LastPrice',
  IndexPrice = 'IndexPrice',
  ReduceOnly = 'ReduceOnly',
  Close = 'Close',
}

export enum BitmexTimeInForce {
  Day = 'Day',
  GoodTillCancel = 'GoodTillCancel',
  ImmediateOrCancel = 'ImmediateOrCancel',
  FillOrKill = 'FillOrKill',
}
