/*
{
  "timestamp": "2019-02-22T18:17:47.782Z",
  "symbol": "XBTUSD",
  "bidSize": 28861,
  "bidPrice": 3924.5,
  "askPrice": 3925,
  "askSize": 31374
}
*/
export interface QuoteSource {
  timestamp: string;
  symbol: string;
  bidSize: number;
  bidPrice: number;
  askPrice: number;
  askSize: number;
}
