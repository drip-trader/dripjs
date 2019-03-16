# dripjs Intelligence

## use

```bash
import { IntelFactory, BitmexSpy } from 'dripjs-intelligence';

const bitmexSpy = IntelFactory.create(BitmexSpy, {
  apiKey: `your apiKey`,
  apiSecret: `your apiSecret`,
  testnet: true,
});
const pair = 'XBTUSD';
bitmexSpy.getTicker$(pair).subscribe((res) => {
  console.log(res);
});
setTimeout(() => {
  console.log('do stop ticker subscription');
  bitmexSpy.stopTicker(pair);
}, 5000);

```
