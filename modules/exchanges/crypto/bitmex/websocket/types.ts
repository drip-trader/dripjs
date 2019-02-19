// { "op": "subscribe", "args": ["orderBookL2_25:XBTUSD"] }
export interface WebsocketRequest {
  op: 'subscribe' | 'unsubscribe';
  args: string | string[];
}

// { "success": true, "subscribe": "orderBookL2_25:XBTUSD", "request": { "op": "subscribe", "args": ["orderBookL2_25:XBTUSD"] } }
export interface WebsocketResponse {
  success: boolean;
  subscribe: string;
  request?: WebsocketRequest;
}

export interface WebsocketData<T = any> {
  // Table name / Subscription topic.
  // Could be "trade", "order", "instrument", etc.
  table: string;

  // The type of the message. Types:
  // 'partial'; This is a table image, replace your data entirely.
  // 'update': Update a single row.
  // 'insert': Insert a new row.
  // 'delete': Delete a row.
  action: 'partial' | 'update' | 'insert' | 'delete';

  // An array of table rows is emitted here. They are identical in structure to data returned from the REST API.
  data: T[];

  //
  // The below fields define the table and are only sent on a `partial`
  //

  // Attribute names that are guaranteed to be unique per object.
  // If more than one is provided, the key is composite.
  // Use these key names to uniquely identify rows. Key columns are guaranteed
  // to be present on all data received.
  keys?: string[];

  // This lists key relationships with other tables.
  // For example, `quote`'s foreign key is {symbol: 'instrument'}
  foreignKeys?: { [key: string]: string };

  // This lists the shape of the table. The possible types:
  // "symbol" - In most languages this is equal to "string"
  // "guid"
  // "timestamp"
  // "timespan"
  // "float"
  // "long"
  // "integer"
  // "boolean"
  types?: { [key: string]: string };

  // When multiple subscriptions are active to the same table, use the `filter` to correlate which datagram
  // belongs to which subscription, as the `table` property will not contain the subscription's symbol.
  filter?: { account?: number; symbol?: string };

  // These are internal fields that indicate how responses are sorted and grouped.
  attributes?: { [key: string]: string };
}
