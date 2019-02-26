import { Bitmex } from '@dripjs/exchanges';
import { realConfig } from '@dripjs/testing';

import { Spy } from './intelligence-factory';
import { BitmexSpy } from './spy';
import { IntelligenceFactory } from '.';

describe('Intelligence factory', () => {
  describe('Spy bitmex', () => {
    let bitmex: Spy;
    let pair = 'XBTUSD';

    beforeAll(() => {
      bitmex = IntelligenceFactory.create(BitmexSpy, realConfig);
    });

    afterAll(() => {
      bitmex.destory();
    });

    it('bitmex getTransaction$', (done) => {
      bitmex.getTransaction$(pair).subscribe((transaction) => {
        expect(transaction).toBeDefined();
      });
      setTimeout(() => {
        bitmex.stopTransaction(pair);
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
      }, 3500);
    });

    it('bitmex getBars', async () => {
      const time = Date.now();
      const bars = await bitmex.getBars({
        symbol: pair,
        resolution: Bitmex.Resolution.day,
        start: time - 1000 * 60 * 60 * 24 * 60,
        end: time,
      });
      expect(bars.length).toEqual(60);
    });

    it('bitmex getSymbols', async () => {
      const symbol = await bitmex.getSymbol(pair);
      expect(symbol).toBeDefined();
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
