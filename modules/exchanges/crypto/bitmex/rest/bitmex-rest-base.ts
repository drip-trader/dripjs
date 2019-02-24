import {
  BitmexConfig,
  BitmexRestBarRequest,
  BitmexRestBarResponse,
  BitmexRestFetchOrderRequest,
  BitmexRestInstrumentResponse,
  BitmexRestOrderRequest,
  BitmexRestOrderResponse,
  BitmexRestOrderbookL2Response,
  BitmexRestOrderbookRequest,
  BitmexRestOrdersResponse,
} from '../types';

export abstract class BitmexRestBase {
  protected config: BitmexConfig;

  constructor(config?: BitmexConfig) {
    this.config = {
      apiKey: '',
      apiSecret: '',
      testnet: false,
      ...config,
    };
  }

  abstract createOrder(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse>;
  abstract fetchOrder(request: Partial<BitmexRestFetchOrderRequest>): Promise<BitmexRestOrdersResponse>;
  abstract updateOrder(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse>;
  abstract cancelOrder(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse>;
  abstract fetchOrderbook(request: BitmexRestOrderbookRequest): Promise<BitmexRestOrderbookL2Response>;
  abstract fetchInstrument(): Promise<BitmexRestInstrumentResponse>;
  abstract fetchBar(request: BitmexRestBarRequest): Promise<BitmexRestBarResponse>;
}
