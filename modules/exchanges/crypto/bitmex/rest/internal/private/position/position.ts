import { sleep } from '@dripjs/common';
import { HttpMethod } from '@dripjs/types';

import { Config, ExecInst, OrderSide, OrderType, PositionResponse } from '../../../../types';
import { PrivateEndPoints, RestFetchPositionRequest, RestOrderRequest, RestPositionsResponse } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { Order } from '../order';

export class Position extends RestInsider {
  private readonly order: Order;

  constructor(config: Config) {
    super(config, PrivateEndPoints.Position);
    this.order = new Order(config);
  }

  async fetch(request: Partial<RestFetchPositionRequest>): Promise<RestPositionsResponse> {
    const res = await this.request(HttpMethod.GET, request);

    return {
      ratelimit: res.ratelimit,
      orders: <PositionResponse[]>res.body,
      error: res.error,
    };
  }

  async create(pair: string, side: OrderSide, amount: number): Promise<RestPositionsResponse> {
    const orderParams: Partial<RestOrderRequest> = {
      symbol: pair,
      side,
      ordType: OrderType.Market,
      orderQty: amount,
    };
    await this.order.create(orderParams);
    await sleep(500);

    return this.fetch({
      filter: {
        symbol: pair,
      },
    });
  }

  async remove(pair: string): Promise<RestPositionsResponse> {
    const orderParams: Partial<RestOrderRequest> = {
      symbol: pair,
      ordType: OrderType.Market,
      execInst: ExecInst.Close,
    };
    await this.order.create(orderParams);
    await sleep(500);

    return this.fetch({
      filter: {
        symbol: pair,
      },
    });
  }
}
