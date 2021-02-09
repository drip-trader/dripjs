/**
 * get channel name
 *
 * @param params
 *
 * eg1:
 * input: {
 *   pair: 'XBTUSD',
 *   endPoint: RestPublicEndPoints.Trade,
 * }
 * output: 'trade:XBTUSD'
 *
 * eg2:
 * input: {
 *   pair: ['XBTUSD', 'ETHUSD'],
 *   endPoint: RestPublicEndPoints.Trade,
 * }
 * output: ['trade:XBTUSD', 'trade:ETHUSD']
 */
export function getChannelName(params: { pair?: string | string[]; endPoint: string }): string | string[] {
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
