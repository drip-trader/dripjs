import { BitmexPrivateEndPoints } from '../../../types';

export function getOrderChannel(pair: string): string {
  return `${BitmexPrivateEndPoints.Order}:${pair}`;
}
