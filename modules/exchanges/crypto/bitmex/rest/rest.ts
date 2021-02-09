import { Observable } from 'rxjs';

import { Config, ExecInst, OrderResponse, OrderType, RestResponse } from '../types';
import { RestBase } from './rest-base';
import { RestOrderRequest } from './types';

export class Rest extends RestBase {
  constructor(config: Config) {
    super(config);
  }

  createLimitOrder(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.createOrder({
      ...request,
      ordType: OrderType.Limit,
    });
  }

  /**
   * 创建被动委托限价单
   * @param request
   * @Return Promise<RestOrderResponse>
   */
  createLimitOrderParticipateDoNotInitiate(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.createLimitOrder({
      ...request,
      execInst: ExecInst.ParticipateDoNotInitiate,
    });
  }

  createStopOrder(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.createOrder({
      ...request,
      ordType: OrderType.Stop,
    });
  }

  createStopOrderLastPriceReduceOnly(request: Partial<RestOrderRequest>): Observable<RestResponse<OrderResponse>> {
    return this.createStopOrder({
      ...request,
      execInst: `${ExecInst.LastPrice},${ExecInst.ReduceOnly}`,
    });
  }

  getOrderById(symbol: string, orderID: string | string[]): Observable<RestResponse<OrderResponse[]>> {
    return this.fetchOrder({
      symbol,
      filter: {
        orderID,
      },
    });
  }

  getStopOrder(symbol: string): Observable<RestResponse<OrderResponse[]>> {
    return this.fetchOrder({
      symbol,
      filter: {
        ordType: OrderType.Stop,
      },
    }
  });

  getActiveStopLimitOrder(symbol: string): Observable<RestResponse<OrderResponse[]>> {
    return this.fetchOrder({
      symbol,
      filter: {
        ordType: OrderType.StopLimit,
        open: true,
      },
    });
  }
}
