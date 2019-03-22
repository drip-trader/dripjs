import { PublicEndPoints, PrivateEndPoints } from '../types';

/**
 * get realtime channel name
 * 
 * @param params 
 *
 * input: `'XBTUSD'、trade; ['XBTUSD', 'ETHUSD']、trade`
 * output: `'trade:XBTUSD'; ['trade:XBTUSD', 'trade:ETHUSD']`
 */
export function getTradeChannel(params: {
  pair?: string | string[],
  endPoint: PublicEndPoints | PrivateEndPoints}
): string | string[] {
  let subStr = `${params.endPoint}`;
  if (params.pair) {
    if (params.pair instanceof Array) {
      const channels: string[] = [];
      for (const p of params.pair) {
        channels.push(`${params.endPoint}:${p}`);
      }

      return channels;
    }
    subStr = `${params.endPoint}:${params.pair}`;
  }

  return subStr;
}
