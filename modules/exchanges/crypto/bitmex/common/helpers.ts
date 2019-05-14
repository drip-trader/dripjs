import { HttpHeaders } from '@dripjs/types';

import { RateLimit } from '../types';

export function getRateLimit(headers: HttpHeaders): RateLimit {
  return {
    remaining: Number(headers['x-ratelimit-remaining']),
    reset: Number(headers['x-ratelimit-reset']),
    limit: Number(headers['x-ratelimit-limit']),
  };
}

/**
 * get channel name
 *
 * @param params
 *
 * eg1:
 * input: {
 *   pair: 'XBTUSD',
 *   endPoint: PublicEndPoints.Trade,
 * }
 * output: 'trade:XBTUSD'
 *
 * eg2:
 * input: {
 *   pair: ['XBTUSD', 'ETHUSD'],
 *   endPoint: PublicEndPoints.Trade,
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
