import {
  Config,
  RestBarRequest,
  RestBarResponse,
  RestFetchOrderRequest,
  RestInstrumentResponse,
  RestOrderRequest,
  RestOrderResponse,
  RestOrderbookL2Response,
  RestOrderbookRequest,
  RestOrdersResponse,
} from '../types';

export abstract class BitmexRestBase {
  protected config: Config;

  constructor(config?: Config) {
    this.config = {
      apiKey: '',
      apiSecret: '',
      testnet: false,
      ...config,
    };
  }

  abstract createOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse>;
  abstract fetchOrder(request: Partial<RestFetchOrderRequest>): Promise<RestOrdersResponse>;
  abstract updateOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse>;
  abstract cancelOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse>;
  abstract fetchOrderbook(request: RestOrderbookRequest): Promise<RestOrderbookL2Response>;
  abstract fetchInstrument(): Promise<RestInstrumentResponse>;
  abstract fetchBar(request: RestBarRequest): Promise<RestBarResponse>;
}
