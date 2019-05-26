import { HttpMethod } from '@dripjs/types';
import { stringify } from 'qs';

import { apiBasePath } from '../rest/types';
import { isNodeJs } from './helpers';

// tslint:disable-next-line:no-var-requires
const createHmac = require('create-hmac');

// tslint:disable-next-line:no-var-requires
const urljoin = require('url-join');

/**
 * Sign a message. hex( HMAC_SHA256(secret, verb + url + nonce + data) )
 *
 * @param  {String} secret API secret.
 * @param  {String} verb   Request verb (GET, POST, etc).
 * @param  {String} url    Request URL.
 * @param  {Number} nonce  Nonce for this request.
 * @param  {String|Object} [data] Request body, if it exists.
 * @return {String}        Signature.
 */
export function signMessage(secret: string, verb: string, url: string, nonce: number, data?: any): string {
  let body = '';
  if (typeof data === 'object') body = JSON.stringify(data);

  return createHmac('sha256', secret)
    .update(`${verb}${url}${nonce}${body}`)
    .digest('hex');
}

let nonceCounter = 0;

export function getWSAuthQuery(apiKey: string, apiSecret: string): string {
  const nonce = Date.now() * 1000 + (nonceCounter++ % 1000); // prevents colliding nonces. Otherwise, use expires
  const query = {
    'api-nonce': nonce,
    'api-key': apiKey,
    'api-signature': signMessage(apiSecret, HttpMethod.GET, '/realtime', nonce),
  };

  return stringify(query);
}

export function getRestAuthHeaders(
  method: HttpMethod,
  baseUrl: string,
  endpoint: string,
  apiKey: string,
  apiSecret: string,
  data?: any,
): AuthHeaders {
  const query = method === HttpMethod.GET && Object.keys(data).length !== 0 ? `?${stringify(data)}` : '';
  const url = urljoin(apiBasePath, endpoint, query);
  // 3min timeout
  const expires = Math.round(Date.now() / 1000) + 60 * 3;
  const body = method === HttpMethod.GET ? '' : data;
  const signature = signMessage(apiSecret, method, url, expires, body);

  const authHeaders: AuthHeaders = {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'api-expires': String(expires),
    'api-key': apiKey,
    'api-signature': signature,
  };
  // 当前环境为node时
  if (isNodeJs()) {
    // 设置Origin
    authHeaders.Origin = baseUrl;
  }

  return authHeaders;
}

export interface AuthHeaders {
  Origin?: string;
  'Content-Type': string;
  accept: string;
  'api-expires': string;
  'api-key': string;
  'api-signature': string;
}
