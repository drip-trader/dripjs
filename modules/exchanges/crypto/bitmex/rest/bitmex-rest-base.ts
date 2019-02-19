import {
  Config,
  FetchOrderRequest,
  OrderRequest,
  OrderbookRequest,
  RestOrderResponse,
  RestOrderbookL2Response,
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

  abstract createOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse>;
  abstract fetchOrder(request: Partial<FetchOrderRequest>): Promise<RestOrdersResponse>;
  abstract updateOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse>;
  abstract cancelOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse>;
  abstract fetchOrderbook(request: OrderbookRequest): Promise<RestOrderbookL2Response>;
}
