# dripjs-bitmex

> dripjs bitmex api wapper, support for rest api and websocket

<p>
<a href="https://www.npmjs.com/package/dripjs-bitmex"><img src="https://img.shields.io/npm/v/dripjs-bitmex.svg" alt="NPM Version" />
<a href="https://www.npmjs.com/package/dripjs"><img src="https://img.shields.io/badge/license-GPL_3.0-green.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/dripjs-bitmex"><img src="https://img.shields.io/npm/dm/dripjs-bitmex.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.com/zlq4863947/dripjs"><img src="https://travis-ci.com/zlq4863947/dripjs.svg?branch=master&t=5" alt="Tiavis" /></a>
<a href="https://coveralls.io/github/zlq4863947/dripjs?branch=master"><img src="https://coveralls.io/repos/github/zlq4863947/dripjs/badge.svg?branch=master&t=5" alt="Coverage" /></a>
<a href="https://gitter.im/drip-js/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/drip-js.svg" alt="Gitter" /></a>
<a href="https://www.paypal.me/zlq4863947"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
</p>

## Install

```shell
npm install dripjs-bitmex
```

## Use

### require

```typescript
var bitmex = require('dripjs-bitmex');

var bitmexWS = new bitmex.BitmexWS({
  apiKey: `apiKey`,
  apiSecret: `apiSecret`,
  testnet: true,
});
bitmexWS.orderbook$('XBTUSD').subscribe((orderbook) => {
  console.log(orderbook);
});
```

### import

```typescript
import { BitmexWS, BitmexRest } from 'dripjs-bitmex';

const bitmexWS = new BitmexWS({
  apiKey: `apiKey`,
  apiSecret: `apiSecret`,
  testnet: true,
});
bitmexWS.orderbook$('XBTUSD').subscribe((orderbook) => {
  console.log(orderbook);
});

const bitmexRest = new BitmexRest({
  apiKey: `apiKey`,
  apiSecret: `apiSecret`,
  testnet: true,
});
bitmexRest
  .fetchOrderbook({
    symbol: 'XBTUSD',
    depth: 5,
  })
  .then((orderbook) => {
    console.log(orderbook);
  });
```

The `orderbook$` output as

```typescript
{
  asks: [["3911", "176809"], ["3911.5", "627"], ["3912", "12786"], ["3912.5", "393"], ["3913", "2213"], …],
  bids: [["3910.5", "27665"], ["3910", "14421"], ["3909.5", "8052"], ["3909", "1765"], ["3908.5", "2958"], …]
}
```

## BitmexWS API

| Method                      | Return                                | Description                |
| --------------------------- | ------------------------------------- | -------------------------- |
| orderbook\$(pair: string)   | Observable`<OrderbookL2Response>`     | realtime orderbook         |
| stopOrderbook(pair: string) | void                                  | stop realtime orderbook    |
| trade\$(pair: string)       | Observable`<TradeResponse>`           | realtime trade             |
| stopTrade(pair: string)     | void                                  | stop realtime trade        |
| order\$(pair: string)       | Observable`<OrderResponse|undefined>` | realtime order             |
| stopOrder(pair: string)     | void                                  | stop realtime order        |
| destroy()                   | void                                  | close websocket connection |

## BitmexRest API

| Method                                           | Return                             | Description |
| ------------------------------------------------ | ---------------------------------- | ----------- |
| createOrder(request: Partial<OrderRequest>)      | `Promise<RestOrderResponse>`       |             |
| fetchOrder(request: Partial<FetchOrderRequest>): | `Promise<RestOrderResponse>`       |             |
| updateOrder(request: Partial<OrderRequest>)      | `Promise<RestOrderResponse>`       |             |
| cancelOrder(request: Partial<OrderRequest>)      | `Promise<RestOrderResponse>`       |             |
| fetchOrderbook(request: OrderbookRequest)        | `Promise<RestOrderbookL2Response>` |             |

# api docs

https://drip-trader.github.io/dripjs-docs/
