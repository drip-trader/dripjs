import {
  BarResponse,
  ErrorResponse,
  InstrumentResponse,
  OrderResponse,
  OrderbookL2Response,
  PositionResponse,
  RateLimit,
} from '../../types';

export interface RestRateLimitResponse extends ErrorResponse {
  ratelimit: RateLimit;
}

export interface RestInstrumentResponse extends RestRateLimitResponse {
  instruments: InstrumentResponse[];
}

export interface RestBarResponse extends RestRateLimitResponse {
  bars: BarResponse[];
}

export interface RestOrderResponse extends RestRateLimitResponse {
  order: OrderResponse;
}

export interface RestOrdersResponse extends RestRateLimitResponse {
  orders: OrderResponse[];
}

export interface RestPositionsResponse extends RestRateLimitResponse {
  orders: PositionResponse[];
}

export interface RestOrderbookL2Response extends RestRateLimitResponse {
  orderbook: OrderbookL2Response;
}
