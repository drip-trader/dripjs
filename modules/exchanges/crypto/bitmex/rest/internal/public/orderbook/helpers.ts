import { transformOrderbook } from '../../../../common';
import { OrderbookL2Response, OrderbookResponse, RestResponse } from '../../../../types';

/**
 * transform raw websocket data to OrderbookL2Response
 * @param source raw websocket data
 */
export function transform(source: RestResponse<OrderbookResponse[]>): RestResponse<OrderbookL2Response> {
  return {
    rateLimit: source.rateLimit,
    data: transformOrderbook(source.data),
  };
}
