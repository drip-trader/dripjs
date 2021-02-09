import { HttpMethod } from '@dripjs/types';
import { Observable, Subject } from 'rxjs';
import { delay, flatMap, take } from 'rxjs/operators';

import { Config, ExecInst, OrderSide, OrderType, PositionResponse, RestResponse } from '../../../../types';
import { PrivateEndPoints } from '../../../constants';
import { RestFetchPositionRequest, RestLeverageRequest, RestOrderRequest } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { Order } from '../order';

export class Position extends RestInsider {
  private readonly order: Order;

  constructor(config: Config, remaining$: Subject<number>) {
    super(config, PrivateEndPoints.Position, remaining$);
    this.order = new Order(config, remaining$);
  }

  fetch(request: Partial<RestFetchPositionRequest>): Observable<RestResponse<PositionResponse[]>> {
    return this.request<PositionResponse[]>(HttpMethod.GET, request);
  }

  create(pair: string, side: OrderSide, amount: number): Observable<RestResponse<PositionResponse[]>> {
    const orderParams: Partial<RestOrderRequest> = {
      symbol: pair,
      side,
      ordType: OrderType.Market,
      orderQty: amount,
    };

    return this.order.create(orderParams).pipe(
      take(1),
      delay(500),
      flatMap(() =>
        this.fetch({
          filter: {
            symbol: pair,
          },
        }),
      ),
    );
  }

  /**
   * 利用市场价触发后平仓
   * @param pair
   */
  remove(pair: string): Observable<RestResponse<PositionResponse[]>> {
    const orderParams: Partial<RestOrderRequest> = {
      symbol: pair,
      ordType: OrderType.Market,
      execInst: ExecInst.Close,
    };

    return this.order.create(orderParams).pipe(
      take(1),
      delay(500),
      flatMap(() =>
        this.fetch({
          filter: {
            symbol: pair,
          },
        }),
      ),
    );
  }

  updateLeverage(request: RestLeverageRequest): Observable<RestResponse<PositionResponse>> {
    return this.requestWithEndpoint<PositionResponse>(PrivateEndPoints.PositionLeverage, HttpMethod.POST, request);
  }
}
