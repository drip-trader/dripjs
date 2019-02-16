import { Headers } from 'node-fetch';

import { RateLimit } from '../types';

export function getRateLimit(headers: Headers): RateLimit {
  return {
    remaining: Number(headers.get('x-ratelimit-remaining')),
    reset: Number(headers.get('x-ratelimit-reset')),
    limit: Number(headers.get('x-ratelimit-limit')),
  };
}
