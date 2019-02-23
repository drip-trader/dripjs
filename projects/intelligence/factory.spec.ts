import { realConfig } from '@dripjs/testing';

import { Spy } from './factory';
import { Bitmex } from './spy';
import { Factory } from '.';

describe('Intelligence factory', () => {
  describe('Spy bitmex', () => {
    let bitmex: Spy;
    let pair = 'XBTUSD';

    beforeAll(() => {
      bitmex = Factory.create(Bitmex, realConfig);
    });

    afterAll(() => {
      bitmex.destory();
    });

    it('bitmex getTransactions$', (done) => {
      bitmex.getTransactions$(pair).subscribe((transactions) => {
        expect(transactions).toBeDefined();
      });
      setTimeout(() => {
        bitmex.stopTransactions(pair);
        done();
      }, 2000);
    });

    it('bitmex getTicker$', async (done) => {
      bitmex.getTicker$(pair).subscribe((res) => {
        expect(res.time).toBeGreaterThan(0);
      });
      setTimeout(() => {
        bitmex.stopTicker(pair);
        done();
      }, 2000);
    });

    it('bitmex getDepth$', async (done) => {
      bitmex.getDepth$(pair).subscribe((res) => {
        expect(res.asks.length).toBeGreaterThan(20);
        expect(res.bids.length).toBeGreaterThan(20);
      });
      setTimeout(() => {
        bitmex.stopDepth(pair);
        done();
      }, 2000);
    });

    it('bitmex getSymbols', async () => {
      const symbols = await bitmex.getSymbols();
      expect(symbols.length).toBeGreaterThan(0);
    });

    it('bitmex getSymbol', async () => {
      pair = 'ETHUSD';
      const symbol = await bitmex.getSymbol(pair);
      expect(symbol!.name).toEqual(pair);
      expect(symbol!.baseAsset).toEqual('ETH');
      expect(symbol!.quoteAsset).toEqual('USD');
      expect(symbol!.amountPrecision).toEqual(1);
      expect(symbol!.pricePrecision).toEqual(2);
    });
  });
});
