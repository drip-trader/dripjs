// {
//   "table": "trade",
//   "action": "partial",
//   "keys": [],
//   "types": {
//     "timestamp": "timestamp",
//     "symbol": "symbol",
//     "side": "symbol",
//     "size": "long",
//     "price": "float",
//     "tickDirection": "symbol",
//     "trdMatchID": "guid",
//     "grossValue": "long",
//     "homeNotional": "float",
//     "foreignNotional": "float",
//   },
//   "foreignKeys": {
//     "symbol": "instrument",
//     "side": "side",
//   },
//   "attributes": {
//     "timestamp": "sorted",
//     "symbol": "grouped",
//   },
//   "filter": { "symbol": "XBTUSD" },
//   "data": [
//     {
//       "timestamp": "2018-12-23T14:23:57.689Z",
//       "symbol": "XBTUSD",
//       "side": "Buy",
//       "size": 1000,
//       "price": 3975.5,
//       "tickDirection": "PlusTick",
//       "trdMatchID": "1c1cce1b-3e9d-0a83-181f-c96eb0725cca",
//       "grossValue": 25154000,
//       "homeNotional": 0.25154,
//       "foreignNotional": 1000,
//     },
//   ],
// }

export interface BitmexTradeWebsocketData {
  timestamp: string;
  symbol: string;
  side: 'Buy' | 'Sell';
  size: number;
  price: number;
  tickDirection: string;
  trdMatchID: string;
  grossValue: number;
  homeNotional: number;
  foreignNotional: number;
}
