import { HttpHeaders } from 'dripjs-types';

import { BitmexConfig, BitmexRateLimit } from '../types';

export function getRateLimit(headers: HttpHeaders): BitmexRateLimit {
  return {
    remaining: Number(headers['x-ratelimit-remaining']),
    reset: Number(headers['x-ratelimit-reset']),
    limit: Number(headers['x-ratelimit-limit']),
  };
}

export const testnetConfig: BitmexConfig = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_API_SECRET']}`,
  testnet: true,
};

export const testnetReadonlyConfig: BitmexConfig = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_TRADE_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_TRADE_API_SECRET']}`,
  testnet: true,
};
