export interface Config {
  apiKey: string;
  apiSecret: string;
  testnet?: boolean;
}

export const wsEndpoints = {
  production: 'wss://www.bitmex.com/realtime',
  testnet: 'wss://testnet.bitmex.com/realtime',
};

export const restEndpoints = {
  production: 'https://www.bitmex.com',
  testnet: 'https://testnet.bitmex.com',
};

export const restApiBasePath = '/api/v1/';

export interface RateLimit {
  remaining: number;
  reset: number;
  limit: number;
}

//  无需身份验证的连接端点集
export enum PublicEndPoints {
  /** 公告 */
  Announcement = 'announcement',
  /** Trollbox聊天室 */
  Chat = 'chat',
  /** Trollbox聊天室频道连接人数（用户、机器人） */
  Connected = 'connected',
  /** 掉期产品的资金费率更新 每个资金时段发送（通常是8小时） */
  Funding = 'funding',
  /** 产品更新，包括交易量以及报价 */
  Instrument = 'instrument',
  /** 每日保险基金的更新 */
  Insurance = 'insurance',
  /** 进入委托列表的强平委托 */
  Liquidation = 'liquidation',
  /** 前 25 层的 Level 2 委托列表 */
  OrderBookL2T25 = 'orderBookL2_25',
  /** 完整的 level 2 委托列表 */
  OrderBookL2 = 'orderBookL2',
  /** 前10层的委托列表，用传统的完整委托列表推送 */
  OrderBook10 = 'orderBook10',
  /** 全系统的告示（用于段时间的消息） */
  Notifications = 'publicNotifications',
  /** 最高层的委托列表 */
  Quote = 'quote',
  /** 每分钟报价数据 */
  QuoteBin1m = 'quoteBin1m',
  /** 每5分钟报价数据 */
  QuoteBin5m = 'quoteBin5m',
  /** 每个小时报价数据 */
  QuoteBin1h = 'quoteBin1h',
  /** 每天报价数据 */
  QuoteBin1d = 'quoteBin1d',
  /** 结算信息 */
  Settlement = 'settlement',
  /** 实时交易 */
  Trade = 'trade',
  /** 每分钟交易数据 */
  TradeBin1m = 'tradeBin1m',
  /** 每5分钟交易数据 */
  TradeBin5m = 'tradeBin5m',
  /** 每小时交易数据 */
  TradeBin1h = 'tradeBin1h',
  /** 每天交易数据 */
  TradeBin1d = 'tradeBin1d',
}

//  要求进行身份验证的连接端点集
export enum PrivateEndPoints {
  /** 邀请人状态，已邀请用户及分红比率 */
  Affiliate = 'affiliate',
  /** 个别成交，可能是多个成交 */
  Execution = 'execution',
  /** 你委托的更新 */
  Order = 'order',
  /** 你账户的余额和保证金要求的更新 */
  Margin = 'margin',
  /** 你仓位的更新 */
  Position = 'position',
  /** 资金提存更新 */
  Transact = 'transact',
  /** 比特币余额更新及总提款存款 */
  Wallet = 'wallet',
}
