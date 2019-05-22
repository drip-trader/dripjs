import { Config, ExecInst, OrderStatus, OrderType } from '../types';
import { RestBase } from './rest-base';
import { RestOrderRequest, RestOrderResponse, RestOrdersResponse } from './types';

export class Rest extends RestBase {
  constructor(config: Config) {
    super(config);
  }

  async createLimitOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
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
  async createLimitOrderParticipateDoNotInitiate(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    return this.createLimitOrder({
      ...request,
      execInst: ExecInst.ParticipateDoNotInitiate,
    });
  }

  async createStopOrder(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    return this.createOrder({
      ...request,
      ordType: OrderType.Stop,
    });
  }

  async createStopOrderLastPriceReduceOnly(request: Partial<RestOrderRequest>): Promise<RestOrderResponse> {
    return this.createStopOrder({
      ...request,
      execInst: `${ExecInst.LastPrice},${ExecInst.ReduceOnly}`,
    });
  }

  async getOrderById(symbol: string, orderID: string): Promise<RestOrdersResponse> {
    return this.fetchOrder({
      symbol,
      filter: {
        orderID,
      },
    });
  }

  async getStopOrder(symbol: string): Promise<RestOrdersResponse> {
    return this.fetchOrder({
      symbol,
      filter: {
        ordStatus: OrderStatus.New,
        ordType: OrderType.Stop,
      },
    });
  }
}
