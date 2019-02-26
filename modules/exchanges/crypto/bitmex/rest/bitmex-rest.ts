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
import { BitmexRestBase } from './bitmex-rest-base';
import { Bar, Instrument, Order, Orderbook } from './internal';

export class BitmexRest extends BitmexRestBase {
  private readonly instrument: Instrument;
  private readonly order: Order;
  private readonly orderbook: Orderbook;
  private readonly bar: Bar;

  constructor(config: Config) {
    super(config);

    this.instrument = new Instrument(config);
    this.order = new Order(config);
    this.orderbook = new Orderbook(config);
    this.bar = new Bar(config);
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
}
