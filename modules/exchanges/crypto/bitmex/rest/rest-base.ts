import { Observable, Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  BarResponse,
  Config,
  InstrumentResponse,
  OrderResponse,
  OrderSide,
  OrderbookL2Response,
  PositionResponse,
  RestResponse,
} from '../types';
import { Bar, Instrument, MultipleOrder, Order, Orderbook, Position } from './internal';
import {
  RestBarRequest,
  RestCancelMultipleOrderRequest,
  RestFetchOrderRequest,
  RestFetchPositionRequest,
  RestLeverageRequest,
  RestMultipleOrderRequest,
  RestOrderRequest,
  RestOrderbookRequest,
} from './types';

/**
 * rest请求处理基础类
 *
 * 用于处理请求基础方法
 */
export class RestBase {
  protected readonly instrument: Instrument;
  protected readonly order: Order;
  protected readonly multipleOrder: MultipleOrder;
  protected readonly orderbook: Orderbook;
  protected readonly bar: Bar;
  protected readonly position: Position;

  private readonly remaining$ = new Subject<number>();
  private readonly disposer$ = new Subject<void>();

  constructor(config: Config) {
    this.instrument = new Instrument(config, this.remaining$);
    this.order = new Order(config, this.remaining$);
    this.multipleOrder = new MultipleOrder(config, this.remaining$);
    this.orderbook = new Orderbook(config, this.remaining$);
    this.bar = new Bar(config, this.remaining$);
    this.position = new Position(config, this.remaining$);
    // 每分钟重置可用余额为60
    interval(60 * 1000)
      .pipe(takeUntil(this.disposer$))
      .subscribe(() => this.remaining$.next(60));
  }

  createOrder(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.order.create(request);
  }

  createMultipleOrder(request: RestMultipleOrderRequest): Observable<RestResponse<OrderResponse[]>> {
    return this.multipleOrder.create(request);
  }

  fetchOrder(request: Partial<RestFetchOrderRequest>): Observable<RestResponse<OrderResponse[]>> {
    return this.order.fetch(request);
  }

  updateOrder(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.order.update(request);
  }

  updateMultipleOrder(request: RestMultipleOrderRequest): Observable<RestResponse<OrderResponse[]>> {
    return this.multipleOrder.update(request);
  }

  cancelOrder(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse[]>> {
    return this.order.cancel(request);
  }

  cancelMultipleOrder(request: Partial<RestCancelMultipleOrderRequest>): Observable<RestResponse<OrderResponse[]>> {
    return this.multipleOrder.cancel(request);
  }

  fetchOrderbook(request: RestOrderbookRequest): Observable<RestResponse<OrderbookL2Response>> {
    return this.orderbook.fetch(request);
  }

  fetchInstrument(): Observable<RestResponse<InstrumentResponse[]>> {
    return this.instrument.fetch();
  }

  fetchBar(request: RestBarRequest): Observable<RestResponse<BarResponse[]>> {
    return this.bar.fetch(request);
  }

  fetchPosition(request: Partial<RestFetchPositionRequest>): Observable<RestResponse<PositionResponse[]>> {
    return this.position.fetch(request);
  }

  createPosition(symbol: string, side: OrderSide, amount: number): Observable<RestResponse<PositionResponse[]>> {
    return this.position.create(symbol, side, amount);
  }

  removePosition(symbol: string): Observable<RestResponse<PositionResponse[]>> {
    return this.position.remove(symbol);
  }

  updateLeverage(request: RestLeverageRequest): Observable<RestResponse<PositionResponse>> {
    return this.position.updateLeverage(request);
  }

  destroy(): void {
    this.disposer$.next();
    this.disposer$.complete();
  }
}
