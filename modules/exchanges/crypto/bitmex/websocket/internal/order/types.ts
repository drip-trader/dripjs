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
  account: string;
  symbol: string;
  side: 'Buy' | 'Sell';
  orderQty: number;
  price: number;
  ordType: string;
  ordStatus: string;
  leavesQty: number;
  timestamp: string;
}
