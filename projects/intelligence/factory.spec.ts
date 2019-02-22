import { testnetConfig } from '@dripjs/testing';

import { Bitmex } from './spy';
import { Factory } from '.';

describe('Intelligence factory', () => {
  describe('Spy bitmex', () => {
    let pair = 'XBTUSD';
    it('bitmex getTransactions$', (done) => {
      const bitmex = Factory.create(Bitmex, testnetConfig);
      bitmex.getTransactions$(pair).subscribe((transactions) => {
        expect(transactions).toBeDefined();
      });
      setTimeout(() => {
        bitmex.stopTransactions(pair);
        bitmex.destory();
        done();
      }, 2000);
    });

    it('bitmex getSymbols', async () => {
      const bitmex = Factory.create(Bitmex, testnetConfig);
      const symbols = await bitmex.getSymbols();
      expect(symbols.length).toBeGreaterThan(0);
    });

    it('bitmex getSymbol', async () => {
      const bitmex = Factory.create(Bitmex, testnetConfig);
      pair = 'ETHUSD';
      const symbol = await bitmex.getSymbol(pair);
      expect(symbol!.name).toEqual(pair);
      expect(symbol!.baseAsset).toEqual('ETH');
      expect(symbol!.quoteAsset).toEqual('USD');
      expect(symbol!.amountPrecision).toEqual(1);
      expect(symbol!.pricePrecision).toEqual(2);
    });
  });
  /*it('create bitmex', (done) => {
    const bitmex = Factory.create(Bitmex, realConfig);
    bitmex.getTransactions$(pair).subscribe((transactions) => {
      expect(transactions).toBeDefined();
      bitmex.stopTransactions(pair);
      bitmex.destory();
      done();
    });
    setTimeout(() => {
      done();
    }, 40000);
  });*/
});
