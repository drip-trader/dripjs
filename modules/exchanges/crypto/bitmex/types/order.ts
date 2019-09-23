export enum OrderSide {
  Buy = 'Buy',
  Sell = 'Sell',
}

export enum OrderStatus {
  New = 'New',
  Filled = 'Filled',
  Rejected = 'Rejected',
  PartiallyFilled = 'PartiallyFilled',
  Canceled = 'Canceled',
}

export enum OrderType {
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
 * 触发类型（Execution Instructions)
 * 多个时以逗号分开
 */
export enum ExecInst {
  /**
   * 被动委托,一旦变为taker会立即取消（保证订单为挂单，节省手续费)
   */
  ParticipateDoNotInitiate = 'ParticipateDoNotInitiate',
  // 止损触发类型,标记价格（Bitmex标记价格（指数价格+基差))
  MarkPrice = 'MarkPrice',
  // 止损触发类型,最新成交价
  LastPrice = 'LastPrice',
  // 止损触发类型,指数价格
  IndexPrice = 'IndexPrice',
  // 仅减少（确保不会增加你的仓位)
  ReduceOnly = 'ReduceOnly',
  // 触发后平仓
  Close = 'Close',
}

export enum TimeInForce {
  Day = 'Day',
  GoodTillCancel = 'GoodTillCancel',
  ImmediateOrCancel = 'ImmediateOrCancel',
  FillOrKill = 'FillOrKill',
}

export enum Triggered {
  StopOrderTriggered = 'StopOrderTriggered',
}

export type OrderTriggered = Triggered | '';
