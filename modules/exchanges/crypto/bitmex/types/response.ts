import { BitmexRateLimit } from './exchange';
import { BitmexOrderSide } from './order';

export interface BitmexError {
  message: string;
  name: string;
}

export interface BitmexErrorResponse {
  error?: BitmexError;
}

export interface RestResponse extends BitmexErrorResponse {
  ratelimit: BitmexRateLimit;
  body: { [attr: string]: any };
}

export interface BitmexTradeResponse {
  side: BitmexOrderSide;
  price: number;
  amount: number;
  timestamp: number;
}

export interface BitmexQuoteResponse {
  timestamp: number;
  bidAmount: number;
  bidPrice: number;
  askAmount: number;
  askPrice: number;
}

export interface BitmexSettlementResponse {
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
export interface BitmexInstrumentResponse {
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

export interface BitmexBarResponse {
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

export interface BitmexOrderResponse {
  orderID: string;
  clOrdID?: string;
  clOrdLinkID?: string;
  account?: string;
  symbol?: string;
  side?: string;
  simpleOrderQty?: number;
  orderQty?: number;
  price?: number;
  displayQty?: number;
  stopPx?: number;
  pegOffsetValue?: number;
  pegPriceType?: string;
  currency?: string;
  settlCurrency?: string;
  ordType?: string;
  timeInForce?: string;
  execInst?: string;
  contingencyType?: string;
  exDestination?: string;
  ordStatus?: string;
  triggered?: string;
  workingIndicator?: boolean;
  ordRejReason?: string;
  simpleLeavesQty?: number;
  leavesQty?: number;
  simpleCumQty?: number;
  cumQty?: number;
  avgPx?: number;
  multiLegReportingType?: string;
  text?: string;
  transactTime?: Date;
  timestamp?: string;
}

export interface BitmexOrderbookResponse {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
}

/**
 * level 2 order book
 */
export interface BitmexOrderbookL2Response {
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

export interface BitmexRestRateLimitResponse extends BitmexErrorResponse {
  ratelimit: BitmexRateLimit;
}

export interface BitmexRestInstrumentResponse extends BitmexRestRateLimitResponse {
  instruments: BitmexInstrumentResponse[];
}

export interface BitmexRestBarResponse extends BitmexRestRateLimitResponse {
  bars: BitmexBarResponse[];
}

export interface BitmexRestOrderResponse extends BitmexRestRateLimitResponse {
  order: BitmexOrderResponse;
}

export interface BitmexRestOrdersResponse extends BitmexRestRateLimitResponse {
  orders: BitmexOrderResponse[];
}

export interface BitmexRestOrderbookL2Response extends BitmexRestRateLimitResponse {
  orderbook: BitmexOrderbookL2Response;
}
