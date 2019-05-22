import { Bitmex } from '@dripjs/exchanges';
import { realConfig } from '@dripjs/testing';
import { OrderSide } from '@dripjs/types';

import { BitmexSpy, IntelFactory, Spy } from '.';

describe('Intel factory', () => {
  describe('Spy bitmex', () => {
    let bitmex: Spy;
    let pair = 'XBTUSD';

    beforeAll(() => {
      bitmex = IntelFactory.create(BitmexSpy, realConfig);
    });

    afterAll(() => {
      bitmex.destory();
    });

    it('bitmex getTransaction$', (done) => {
      let sideNum = 0;
      let side: OrderSide;
      bitmex.getTransaction$(pair).subscribe((transaction) => {
        if (sideNum === 0) {
          expect(transaction).toBeDefined();
          side = transaction.side;
          sideNum++;
        } else if (sideNum === 1 && side && transaction.side !== side) {
          expect(transaction).toBeDefined();
          bitmex.stopTransaction(pair);
          done();
        }
      });
    });

    it('bitmex getTicker$', async (done) => {
      bitmex.getTicker$(pair).subscribe((res) => {
        expect(res.time).toBeGreaterThan(0);
      });
      setTimeout(() => {
        bitmex.stopTicker(pair);
        done();
      }, 3000);
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

    it('bitmex getBars to not supported resolution', async () => {
      const time = Date.now();
      const bars = await bitmex.getBars({
        symbol: pair,
        resolution: Bitmex.Resolution.day,
        start: time - 1000 * 60 * 60 * 24 * 60,
        end: time,
      });
      expect(bars.length).toEqual(60);
    });

    it('bitmex getBars to not supported resolution', async () => {
      const time = Date.now();
      const request = {
        symbol: pair,
        resolution: '30min',
        start: time - 1000 * 60 * 60 * 24 * 60,
        end: time,
      };
      const resolutions: string[] = Object.values(Bitmex.Resolution);
      await expect(bitmex.getBars(request)).rejects.toThrowError(
        new Error(`${request.resolution} is not supported,${bitmex.name} only allows resolution: ${resolutions}`),
      );
    });

    it('bitmex getSymbols', async () => {
      const symbol = await bitmex.getSymbol(pair);
      expect(symbol).toBeDefined();
      const symbols = await bitmex.getSymbols();
      expect(symbols.length).toBeGreaterThan(0);
    });

    it('bitmex getSymbols has error', async () => {
      const error = new Error('getSymbols has error');
      const bitmex2 = IntelFactory.create(BitmexSpy, realConfig);
      (<any>bitmex2).rest.fetchInstrument = jest.fn(
        async () =>
          // tslint:disable-next-line
          new Promise((resolve) => {
            resolve({ error });
          }),
      );
      await expect(bitmex2.getSymbols()).rejects.toThrowError(error);
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
