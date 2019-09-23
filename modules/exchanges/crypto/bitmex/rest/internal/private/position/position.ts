import { sleep } from '@dripjs/common';
import { HttpMethod } from '@dripjs/types';

import { Config, ErrorResponse, ExecInst, OrderSide, OrderType, PositionResponse } from '../../../../types';
import { RestFetchPositionRequest, RestOrderRequest, RestPositionsResponse, RestPrivateEndPoints } from '../../../types';
import { RestInsider } from '../../rest-insider';
import { Order } from '../order';

export class Position extends RestInsider {
  private readonly order: Order;

  constructor(config: Config) {
    super(config, RestPrivateEndPoints.Position);
    this.order = new Order(config);
  }

  async fetch(request: Partial<RestFetchPositionRequest>): Promise<RestPositionsResponse | ErrorResponse> {
    return this.request<PositionResponse[]>(HttpMethod.GET, request);
  }

  async create(pair: string, side: OrderSide, amount: number): Promise<RestPositionsResponse | ErrorResponse> {
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

  async remove(pair: string): Promise<RestPositionsResponse | ErrorResponse> {
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
