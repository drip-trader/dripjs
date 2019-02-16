import { OrderResponse, PrivateEndPoints } from '../../types';
import { OrderSource } from './types';

export function transform(orderList: OrderSource[]): OrderResponse | undefined {
  if (orderList.length > 0) {
    return { ...orderList[orderList.length - 1] };
  }
}

export function getOrderChannel(pair: string): string {
  return `${PrivateEndPoints.Order}:${pair}`;
}
