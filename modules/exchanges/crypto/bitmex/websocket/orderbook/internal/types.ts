// { "symbol": "XBTUSD", "id": 8799601600, "side": "Sell", "size": 539077, "price": 3984 }
export interface BitmexOrderbookWebsocketData {
  symbol: string;
  id: number;
  side: 'Sell' | 'Buy';
  size: number;
  price: number;
}
