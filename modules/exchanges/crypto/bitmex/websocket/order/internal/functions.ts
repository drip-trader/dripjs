import { Order } from '../../../../types';
import { BitmexOrderWebsocketData } from './types';

export function adaptBitmexOrder(bitmexOrderList: BitmexOrderWebsocketData[]): Order | undefined {
  if (bitmexOrderList.length > 0) {
    return { ...bitmexOrderList[bitmexOrderList.length - 1] };
  }
}
