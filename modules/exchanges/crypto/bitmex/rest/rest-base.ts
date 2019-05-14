import { Config, OrderSide } from '../types';
import { Bar, Instrument, Order, Orderbook, Position } from './internal';
import {
  RestBarRequest,
  RestBarResponse,
  RestFetchOrderRequest,
  RestFetchPositionRequest,
  RestInstrumentResponse,
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
    this.orderbook = new Orderbook(cfg);
    this.bar = new Bar(cfg);
    this.position = new Position(cfg);
  }

  async createOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    return this.order.create(request);
  }

  async fetchOrder(request: Partial<RestFetchOrderRequest>): Promise<RestOrdersResponse> {
    return this.order.fetch(request);
  }

  async updateOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    return this.order.update(request);
  }

  async cancelOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    return this.order.cancel(request);
  }

  async fetchOrderbook(request: RestOrderbookRequest): Promise<RestOrderbookL2Response> {
    return this.orderbook.fetch(request);
  }

  async fetchInstrument(): Promise<RestInstrumentResponse> {
    return this.instrument.fetch();
  }

  async fetchBar(request: RestBarRequest): Promise<RestBarResponse> {
    return this.bar.fetch(request);
  }

  async fetchPosition(request: Partial<RestFetchPositionRequest>): Promise<RestPositionsResponse> {
    return this.position.fetch(request);
  }

  async createPosition(symbol: string, side: OrderSide, amount: number): Promise<RestPositionsResponse> {
    return this.position.create(symbol, side, amount);
  }

  async removePosition(symbol: string): Promise<RestPositionsResponse> {
    return this.position.remove(symbol);
  }
}
