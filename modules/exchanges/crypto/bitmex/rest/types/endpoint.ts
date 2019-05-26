export const endpoints = {
  production: 'https://www.bitmex.com/',
  testnet: 'https://testnet.bitmex.com/',
};

export const apiBasePath = '/api/v1/';

/**
 * 无需身份验证的连接端点集
 */
export enum PublicEndPoints {
  /** 产品更新，包括交易量以及报价 */
  Instrument = 'instrument',
  /** 可交易合约 */
  InstrumentActive = 'instrument/active',
  /** 特定时间范围的交易数据 */
  TradeBucketed = 'trade/bucketed',
  /** 完整的 level 2 委托列表 */
  OrderBookL2 = 'orderBook/L2',
}

//  要求进行身份验证的连接端点集
export enum PrivateEndPoints {
  /** 邀请人状态，已邀请用户及分红比率 */
  /** 你委托的更新 */
  Order = 'order',
  /** 你仓位的更新 */
  Position = 'position',
}
