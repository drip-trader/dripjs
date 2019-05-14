/*{
  "orderID": "16fdba32-4c21-89a1-4375-ce6d15009d44",
  "clOrdID": "",
  "clOrdLinkID": "",
  "account": 447457,
  "symbol": "XBTUSD",
  "side": "Buy",
  "simpleOrderQty": null,
  "orderQty": 50,
  "price": 3826,
  "displayQty": null,
  "stopPx": null,
  "pegOffsetValue": null,
  "pegPriceType": "",
  "currency": "USD",
  "settlCurrency": "XBt",
  "ordType": "Limit",
  "timeInForce": "GoodTillCancel",
  "execInst": "",
  "contingencyType": "",
  "exDestination": "XBME",
  "ordStatus": "New",
  "triggered": "",
  "workingIndicator": false,
  "ordRejReason": "",
  "simpleLeavesQty": null,
  "leavesQty": 50,
  "simpleCumQty": null,
  "cumQty": 0,
  "avgPx": null,
  "multiLegReportingType": "SingleSecurity",
  "text": "Submitted via API.",
  "transactTime": "2019-01-02T15:06:15.616Z",
  "timestamp": "2019-01-02T15:06:15.616Z"
}*/

export interface OrderSource {
  orderID: string;
  clOrdID: string;
  clOrdLinkID: string;
  account: number;
  symbol: string;
  side: 'Buy' | 'Sell';
  simpleOrderQty: number;
  orderQty: number;
  price: number;
  displayQty: number;
  stopPx: number;
  pegOffsetValue: number;
  pegPriceType: string;
  currency: string;
  settlCurrency: string;
  ordType: string;
  timeInForce: string;
  execInst: string;
  contingencyType: string;
  exDestination: string;
  ordStatus: string;
  triggered: string;
  workingIndicator: boolean;
  ordRejReason: string;
  simpleLeavesQty: number;
  leavesQty: number;
  simpleCumQty: number;
  cumQty: number;
  avgPx: number;
  multiLegReportingType: string;
  text: string;
  transactTime: Date;
  timestamp: string;
}
