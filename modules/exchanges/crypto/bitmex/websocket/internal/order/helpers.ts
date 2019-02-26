import { PrivateEndPoints } from '../../../types';

export function getOrderChannel(pair: string): string {
  return `${PrivateEndPoints.Order}:${pair}`;
}
