/**
 * rest请求最小剩余可用数
 */
export const MINIMUM_REMAINING_NUM = 15;

/**
 * rest请求最大剩余可用数
 */
export const MAX_REMAINING_NUM = 60;

export const endpoints = {
  production: 'https://www.bitmex.com',
  testnet: 'https://testnet.bitmex.com',
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
  /** 你委托的更新 */
  Order = 'order',
  /** 复数订单 */
  OrderBulk = 'order/bulk',
  /** 全部订单 */
  OrderAll = 'order/all',
  /** 你仓位的更新 */
  Position = 'position',
  /** 仓位杠杆的更新 */
  PositionLeverage = 'position/leverage',
  /** 报价 */
  Quote = 'quote',
}
