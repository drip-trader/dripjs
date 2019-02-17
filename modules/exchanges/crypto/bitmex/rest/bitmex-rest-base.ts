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

  abstract async createOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse>;
  abstract async fetchOrder(request: Partial<FetchOrderRequest>): Promise<RestOrdersResponse>;
  abstract async updateOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse>;
  abstract async cancelOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse>;
  abstract async fetchOrderbook(request: OrderbookRequest): Promise<RestOrderbookL2Response>;
}
