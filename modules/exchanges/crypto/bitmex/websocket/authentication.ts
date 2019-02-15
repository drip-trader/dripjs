import { createHmac } from 'crypto';
import { stringify } from 'querystring';

/**
 * Sign a message. hex( HMAC_SHA256(secret, verb + url + nonce + data) )
 * @param  {String} secret API secret.
 * @param  {String} verb   Request verb (GET, POST, etc).
 * @param  {String} url    Request URL.
 * @param  {Number} nonce  Nonce for this request.
 * @param  {String|Object} [data] Request body, if it exists.
 * @return {String}        Signature.
 */
export function signMessage(secret: string, verb: string, url: string, nonce: number, data?: any) {
  if (!data) data = '';
  else if (typeof data === 'object') data = JSON.stringify(data);

  return createHmac('sha256', secret)
    .update(verb + url + nonce + data)
    .digest('hex');
}

let nonceCounter = 0;

export function getWSAuthQuery(apiKey: string, apiSecret: string) {
  const nonce = Date.now() * 1000 + (nonceCounter++ % 1000); // prevents colliding nonces. Otherwise, use expires
  const query = {
    'api-nonce': nonce,
    'api-key': apiKey,
    'api-signature': signMessage(apiSecret, 'GET', '/realtime', nonce),
  };

  return stringify(query);
}
