export const endpoints = {
  production: 'wss://www.bitmex.com/realtime',
  testnet: 'wss://testnet.bitmex.com/realtime',
};

/**
 * 无需身份验证的连接端点集
 */
export enum PublicEndPoints {
  /** 前 25 层的 Level 2 委托列表 */
  OrderBookL2T25 = 'orderBookL2_25',
  /** 完整的 level 2 委托列表 */
  OrderBookL2 = 'orderBookL2',
  /** 前10层的委托列表，用传统的完整委托列表推送 */
  OrderBook10 = 'orderBook10',
  /** 最高层的委托列表 */
  Quote = 'quote',
  /** 结算信息 */
  Settlement = 'settlement',
  /** 实时交易 */
  Trade = 'trade',
  /** 每天交易数据 */
  TradeBin1d = 'tradeBin1d',
}

//  要求进行身份验证的连接端点集
export enum PrivateEndPoints {
  /** 邀请人状态，已邀请用户及分红比率 */
  /** 你委托的更新 */
  Order = 'order',
  /** 你仓位的更新 */
  Position = 'position',
}
