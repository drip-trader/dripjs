import { HttpHeaders } from '@dripjs/types';

import { RateLimit } from '../types';

export function getRateLimit(headers: HttpHeaders): RateLimit {
  return {
    remaining: Number(headers['x-ratelimit-remaining']),
    reset: Number(headers['x-ratelimit-reset']),
    limit: Number(headers['x-ratelimit-limit']),
  };
}
