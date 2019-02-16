import {
  Config,
  FetchOrderRequest,
  OrderRequest,
  OrderbookRequest,
  RestOrderResponse,
  RestOrderbookL2Response,
  RestOrdersResponse,
} from '../types';
import { BitmexRestBase } from './bitmex-rest-base';
import { Order } from './order';
import { Orderbook } from './orderbook';

export class BitmexRest extends BitmexRestBase {
  private readonly order: Order;
  private readonly orderbook: Orderbook;

  constructor(config?: Config) {
    super(config);

    this.order = new Order(config!);
    this.orderbook = new Orderbook(config!);
  }

  async createOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    return this.order.create(request);
  }

  async fetchOrder(request: Partial<FetchOrderRequest>): Promise<RestOrdersResponse> {
    return this.order.fetch(request);
  }

  async updateOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    return this.order.update(request);
  }

  async removeOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    return this.order.remove(request);
  }

  async fetchOrderbook(request: OrderbookRequest): Promise<RestOrderbookL2Response> {
    return this.orderbook.fetch(request);
  }
}
