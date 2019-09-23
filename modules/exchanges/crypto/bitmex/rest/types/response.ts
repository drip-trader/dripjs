import {
  BarResponse,
  InstrumentResponse,
  OrderResponse,
  OrderbookL2Response,
  PositionResponse,
  RateLimit,
  ResponseType,
} from '../../types';

export interface RestRateLimitResponse {
  type: ResponseType.Rest;
  ratelimit: RateLimit;
}

export interface RestInstrumentResponse extends RestRateLimitResponse {
  data: InstrumentResponse[];
}

export interface RestBarResponse extends RestRateLimitResponse {
  data: BarResponse[];
}

export interface RestOrderResponse extends RestRateLimitResponse {
  data: OrderResponse;
}

export interface RestOrdersResponse extends RestRateLimitResponse {
  data: OrderResponse[];
}

export interface RestPositionsResponse extends RestRateLimitResponse {
  data: PositionResponse[];
}

export interface RestOrderbookL2Response extends RestRateLimitResponse {
  data: OrderbookL2Response;
}
