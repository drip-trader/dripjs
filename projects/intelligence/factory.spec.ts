import { realConfig } from '@dripjs/testing';

import { Bitmex } from './spy';
import { Factory } from '.';

describe('Intelligence factory', () => {
  const pair = 'XBTUSD';
  it('create bitmex', (done) => {
    const bitmex = Factory.create(Bitmex, realConfig);
    bitmex.getTransactions$(pair).subscribe((transactions) => {
      expect(transactions).toBeDefined();
      bitmex.stopTransactions(pair);
      bitmex.destory();
      done();
    });
    /*setTimeout(() => {
      done();
    }, 40000);*/
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
