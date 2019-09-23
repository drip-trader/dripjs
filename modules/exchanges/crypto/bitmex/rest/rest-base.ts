import { Config, ErrorResponse, OrderSide } from '../types';
import { Bar, Instrument, MultipleOrder, Order, Orderbook, Position } from './internal';
import {
  RestBarRequest,
  RestBarResponse,
  RestCancelMultipleOrdewrRequest,
  RestFetchOrderRequest,
  RestFetchPositionRequest,
  RestInstrumentResponse,
  RestMultipleOrderRquest,
  RestOrderRequest,
  RestOrderResponse,
  RestOrderbookL2Response,
  RestOrderbookRequest,
  RestOrdersResponse,
  RestPositionsResponse,
} from './types';

export class RestBase {
  protected readonly instrument: Instrument;
  protected readonly order: Order;
  protected readonly multipleOrder: MultipleOrder;
  protected readonly orderbook: Orderbook;
  protected readonly bar: Bar;
  protected readonly position: Position;

  constructor(config: Config) {
    const cfg = {
      apiKey: '',
      apiSecret: '',
      testnet: false,
      ...config,
    };
    this.instrument = new Instrument(cfg);
    this.order = new Order(cfg);
    this.multipleOrder = new MultipleOrder(cfg);
    this.orderbook = new Orderbook(cfg);
    this.bar = new Bar(cfg);
    this.position = new Position(cfg);
  }

  async createOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse | ErrorResponse> {
    return this.order.create(request);
  }

  async createMultipleOrder(request: RestMultipleOrderRquest): Promise<RestOrdersResponse | ErrorResponse> {
    return this.multipleOrder.create(request);
  }

  async fetchOrder(request: Partial<RestFetchOrderRequest>): Promise<RestOrdersResponse | ErrorResponse> {
    return this.order.fetch(request);
  }

  async updateOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse | ErrorResponse> {
    return this.order.update(request);
  }

  async updateMultipleOrder(request: RestMultipleOrderRquest): Promise<RestOrdersResponse | ErrorResponse> {
    return this.multipleOrder.update(request);
  }

  async cancelOrder(request: Partial<RestOrderRequest>): Promise<RestOrdersResponse | ErrorResponse> {
    return this.order.cancel(request);
  }

  async cancelMultipleOrder(request: Partial<RestCancelMultipleOrdewrRequest>): Promise<RestOrdersResponse | ErrorResponse> {
    return this.multipleOrder.cancel(request);
  }

  async fetchOrderbook(request: RestOrderbookRequest): Promise<RestOrderbookL2Response | ErrorResponse> {
    return this.orderbook.fetch(request);
  }

  async fetchInstrument(): Promise<RestInstrumentResponse | ErrorResponse> {
    return this.instrument.fetch();
  }

  async fetchBar(request: RestBarRequest): Promise<RestBarResponse | ErrorResponse> {
    return this.bar.fetch(request);
  }

  async fetchPosition(request: Partial<RestFetchPositionRequest>): Promise<RestPositionsResponse | ErrorResponse> {
    return this.position.fetch(request);
  }

  async createPosition(symbol: string, side: OrderSide, amount: number): Promise<RestPositionsResponse | ErrorResponse> {
    return this.position.create(symbol, side, amount);
  }

  async removePosition(symbol: string): Promise<RestPositionsResponse | ErrorResponse> {
    return this.position.remove(symbol);
  }
}
