/*
{
  "timestamp": "2016-08-28T12:00:00.000Z",
  "symbol": "XBTUSD",
  "settlementType": "Rebalance",
  "settledPrice": 571.71,
  "optionStrikePrice": null,
  "optionUnderlyingPrice": null,
  "bankrupt": null,
  "taxBase": null,
  "taxRate": null
}
*/
export interface SettlementSource {
  timestamp: string;
  symbol: string;
  settlementType: string;
  settledPrice: number;
  optionStrikePrice: any;
  optionUnderlyingPrice: any;
  bankrupt: any;
  taxBase: any;
  taxRate: any;
}
