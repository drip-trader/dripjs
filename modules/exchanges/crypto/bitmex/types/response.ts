import { RateLimit } from './exchange';
import { OrderSide } from './order';

export interface RestResponse<T> {
  rateLimit: RateLimit;
  data: T;
}

export interface TradeResponse {
  symbol: string;
  side: OrderSide;
  price: number;
  amount: number;
  timestamp: number;
}

export interface QuoteResponse {
  symbol: string;
  timestamp: number;
  bidAmount: number;
  bidPrice: number;
  askAmount: number;
  askPrice: number;
}

export interface MarginResponse {
  // 钱包余额
  walletBalance: number;
  // 杠杆倍数
  leverage: number;
}

export interface SettlementResponse {
  timestamp: number;
  symbol: string;
  settlementType: string;
  settledPrice: number;
  optionStrikePrice: any;
  optionUnderlyingPrice: any;
  bankrupt: any;
  taxBase: any;
  taxRate: any;
}

export interface InstrumentResponse {
  symbol: string;
  rootSymbol: string;
  state: string;
  typ: string;
  listing: string;
  front: string;
  expiry: string;
  settle: string;
  positionCurrency: string;
  underlying: string;
  quoteCurrency: string;
  underlyingSymbol: string;
  reference: string;
  referenceSymbol: string;
  maxOrderQty: number;
  maxPrice: number;
  lotSize: number;
  tickSize: number;
  settlCurrency: string;
  isQuanto: boolean;
  isInverse: boolean;
  initMargin: number;
  maintMargin: number;
  riskLimit: number;
  riskStep: number;
  capped: boolean;
  taxed: boolean;
  deleverage: boolean;
  makerFee: boolean;
  takerFee: boolean;
  settlementFee: boolean;
  insuranceFee: boolean;
  prevClosePrice: number;
  prevTotalVolume: number;
  totalVolume: number;
  volume: number;
  volume24h: number;
  prevTotalTurnover: number;
  totalTurnover: number;
  turnover: number;
  turnover24h: number;
  homeNotional24h: number;
  foreignNotional24h: number;
  prevPrice24h: number;
  vwap: number;
  highPrice: number;
  lowPrice: number;
  lastPrice: number;
  lastPriceProtected: number;
  lastTickDirection: string;
  lastChangePcnt: number;
  bidPrice: number;
  midPrice: number;
  askPrice: number;
  impactBidPrice: number;
  impactMidPrice: number;
  impactAskPrice: number;
  hasLiquidity: boolean;
  openInterest: number;
  openValue: number;
  fairMethod: string;
  fairBasisRate: number;
  fairBasis: number;
  fairPrice: number;
  markMethod: string;
  markPrice: number;
  indicativeTaxRate: number;
  indicativeSettlePrice: number;
  timestamp: string;
}

export interface BarResponse {
  timestamp: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  trades: number;
  volume: number;
  vwap: number;
  lastSize: number;
  turnover: number;
  homeNotional: number;
  foreignNotional: number;
}

export interface OrderResponse {
  orderID: string;
  clOrdID: string;
  clOrdLinkID: string;
  account: number;
  symbol: string;
  side: string;
  simpleOrderQty: number;
  orderQty: number;
  price: number;
  displayQty: number;
  stopPx: number;
  pegOffsetValue: number;
  pegPriceType: string;
  currency: string;
  settlCurrency: string;
  ordType: string;
  timeInForce: string;
  execInst: string;
  contingencyType: string;
  exDestination: string;
  ordStatus: string;
  triggered: string;
  workingIndicator: boolean;
  ordRejReason: string;
  simpleLeavesQty: number;
  leavesQty: number;
  simpleCumQty: number;
  cumQty: number;
  avgPx: number;
  multiLegReportingType: string;
  text: string;
  transactTime: Date;
  timestamp: string;
  error: string;
}

export interface PositionResponse {
  account: number;
  symbol: string;
  currency: string;
  underlying: string;
  quoteCurrency: string;
  commission: number;
  initMarginReq: number;
  maintMarginReq: number;
  riskLimit: number;
  /**
   * 杠杆倍数
   */
  leverage: number;
  /**
   * 是否全仓
   */
  crossMargin: boolean;
  deleveragePercentile: number | null;
  rebalancedPnl: number;
  prevRealisedPnl: number;
  prevUnrealisedPnl: number;
  prevClosePrice: number;
  openingTimestamp: string;
  openingQty: number;
  openingCost: number;
  openingComm: number;
  openOrderBuyQty: number;
  openOrderBuyCost: number;
  openOrderBuyPremium: number;
  openOrderSellQty: number;
  openOrderSellCost: number;
  openOrderSellPremium: number;
  execBuyQty: number;
  execBuyCost: number;
  execSellQty: number;
  execSellCost: number;
  execQty: number;
  execCost: number;
  execComm: number;
  currentTimestamp: string;
  currentQty: number;
  currentCost: number;
  currentComm: number;
  realisedCost: number;
  unrealisedCost: number;
  grossOpenCost: number;
  grossOpenPremium: number;
  grossExecCost: number;
  isOpen: boolean;
  markPrice: null;
  markValue: number;
  riskValue: number;
  homeNotional: number;
  foreignNotional: number;
  posState: string;
  posCost: number;
  posCost2: number;
  posCross: number;
  posInit: number;
  posComm: number;
  posLoss: number;
  posMargin: number;
  posMaint: number;
  posAllowance: number;
  taxableMargin: number;
  initMargin: number;
  maintMargin: number;
  sessionMargin: number;
  targetExcessMargin: number;
  varMargin: number;
  realisedGrossPnl: number;
  realisedTax: number;
  /**
   * 已实现盈亏
   */
  realisedPnl: number;
  unrealisedGrossPnl: number;
  longBankrupt: number;
  shortBankrupt: number;
  taxBase: number;
  indicativeTaxRate: number;
  indicativeTax: number;
  unrealisedTax: number;
  /**
   * 未实现盈亏
   */
  unrealisedPnl: number;
  /**
   * 未实现盈亏比
   */
  unrealisedPnlPcnt: number;
  unrealisedRoePcnt: number;
  /**
   * 平均成本价
   */
  avgCostPrice: number;
  /**
   * 平均价格
   */
  avgEntryPrice: number;
  breakEvenPrice: number;
  marginCallPrice: number;
  liquidationPrice: number;
  /**
   * 强平价格
   */
  bankruptPrice: number;
  timestamp: number;
  lastPrice: number;
  lastValue: number;
}

export interface OrderbookResponse {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
}

/**
 * level 2 order book
 */
export interface OrderbookL2Response {
  /**
   * price and amount of ask (asc order)
   * eg: [[price, amount], ...]
   */
  asks: [string, string][];
  /**
   * price and amount of bid (desc order)
   * eg: [[price, amount], ...]
   */
  bids: [string, string][];
}
