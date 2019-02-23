import {
  BitmexRestBarRequest,
  Config,
  FetchOrderRequest,
  OrderRequest,
  OrderbookRequest,
  RestBarResponse,
  RestInstrumentResponse,
  RestOrderResponse,
  RestOrderbookL2Response,
  RestOrdersResponse,
} from '../types';
import { Bar } from './bar';
import { BitmexRestBase } from './bitmex-rest-base';
import { Instrument } from './instrument';
import { Order } from './order';
import { Orderbook } from './orderbook';

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

  async createOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    return this.order.create(request);
  }

  async fetchOrder(request: Partial<FetchOrderRequest>): Promise<RestOrdersResponse> {
    return this.order.fetch(request);
  }

  async updateOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    return this.order.update(request);
  }

  async cancelOrder(request: Partial<OrderRequest>): Promise<RestOrderResponse> {
    return this.order.cancel(request);
  }

  async fetchOrderbook(request: OrderbookRequest): Promise<RestOrderbookL2Response> {
    return this.orderbook.fetch(request);
  }

  async fetchInstrument(): Promise<RestInstrumentResponse> {
    return this.instrument.fetch();
  }

  async fetchBar(request: BitmexRestBarRequest): Promise<RestBarResponse> {
    return this.bar.fetch(request);
  }
}
