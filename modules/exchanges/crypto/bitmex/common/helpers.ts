import { HttpHeaders } from '@dripjs/types';

import { endpoints } from '../rest/types';
import { Config, RateLimit } from '../types';

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

/**
 * 获取api的url
 * @param cfg
 */
export function getRestApiUrl(cfg: Config): string {
  if (cfg.apiUrl) {
    return cfg.apiUrl;
  }

  if (cfg.testnet) {
    return endpoints.testnet;
  }

  return endpoints.production;
}

/**
 * 判断是否为node.js环境
 */
export function isNodeJs(): boolean {
  return typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node !== 'undefined';
}
