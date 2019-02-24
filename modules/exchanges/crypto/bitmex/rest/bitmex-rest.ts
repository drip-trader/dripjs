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
import { BitmexRestBase } from './bitmex-rest-base';
import { Bar, Instrument, Order, Orderbook } from './internal';

export class BitmexRest extends BitmexRestBase {
  private readonly instrument: Instrument;
  private readonly order: Order;
  private readonly orderbook: Orderbook;
  private readonly bar: Bar;

  constructor(config: BitmexConfig) {
    super(config);

    this.instrument = new Instrument(config);
    this.order = new Order(config);
    this.orderbook = new Orderbook(config);
    this.bar = new Bar(config);
  }

  async createOrder(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse> {
    return this.order.create(request);
  }

  async fetchOrder(request: Partial<BitmexRestFetchOrderRequest>): Promise<BitmexRestOrdersResponse> {
    return this.order.fetch(request);
  }

  async updateOrder(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse> {
    return this.order.update(request);
  }

  async cancelOrder(request: Partial<BitmexRestOrderRequest>): Promise<BitmexRestOrderResponse> {
    return this.order.cancel(request);
  }

  async fetchOrderbook(request: BitmexRestOrderbookRequest): Promise<BitmexRestOrderbookL2Response> {
    return this.orderbook.fetch(request);
  }

  async fetchInstrument(): Promise<BitmexRestInstrumentResponse> {
    return this.instrument.fetch();
  }

  async fetchBar(request: BitmexRestBarRequest): Promise<BitmexRestBarResponse> {
    return this.bar.fetch(request);
  }
}
