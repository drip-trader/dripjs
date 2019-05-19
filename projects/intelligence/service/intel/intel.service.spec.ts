import { Depth, SupportedExchange, Ticker, Transaction } from '@dripjs/types';

import { Resolution } from '../../core';
import { IntelServiceException } from '../exceptions';
import { IntelChannel } from '../types';
import { IntelService } from './intel.service';

describe('IntelService', () => {
  let intelService: IntelService;

  beforeAll(() => {
    intelService = new IntelService();
  });

  describe('getSymbols', () => {
    it('is not supported', async () => {
      const exchange = 'testEx';
      await expect(intelService.getSymbols(exchange)).rejects.toEqual(
        new IntelServiceException(
          `Exchange ${exchange} is not supported, now lists of supported exchanges: ${Object.values(SupportedExchange)}`,
        ),
      );
    });

    it('return symbols', async () => {
      const exchange = SupportedExchange.Bitmex;
      const symbols = await intelService.getSymbols(exchange);
      expect(symbols.length).toBeGreaterThan(0);
    });
  });

  describe('getBars', () => {
    const pair = 'XBTUSD';
    const resolution = Resolution.day;
    const end = Date.now();
    const start = end - 1000 * 60 * 60 * 24 * 60;
    it('is not supported', async () => {
      const exchange = 'testEx';
      await expect(intelService.getBars(exchange, pair, resolution, start, end)).rejects.toEqual(
        new IntelServiceException(
          `Exchange ${exchange} is not supported, now lists of supported exchanges: ${Object.values(SupportedExchange)}`,
        ),
      );
    });

    it('return bars', async () => {
      const exchange = SupportedExchange.Bitmex;
      const bars = await intelService.getBars(exchange, pair, resolution, start, end);
      expect(bars.length).toBeGreaterThan(0);
    });
  });

  describe('subscribe', () => {
    const exchange = SupportedExchange.Bitmex;
    const pair = 'XBTUSD';

    afterAll(() => {
      intelService.stopData(exchange, pair);
      intelService.close();
    });

    it('ticker', (done) => {
      const type = IntelChannel.Ticker;
      intelService.data$(exchange, pair, type).subscribe((res) => {
        expect(res.channel).toEqual(type);
        expect(res.data).toBeDefined();
        expect((<Ticker>res.data).ask).toBeGreaterThan(0);
        expect((<Ticker>res.data).bid).toBeGreaterThan(0);
        intelService.stopData(exchange, pair, type);
        done();
      });
    });

    it('depth', async (done) => {
      const type = IntelChannel.Depth;
      intelService.data$(exchange, pair, type).subscribe((res) => {
        expect(res.channel).toEqual(type);
        expect(res.data).toBeDefined();
        expect((<Depth>res.data).asks.length).toBeGreaterThan(20);
        expect((<Depth>res.data).bids.length).toBeGreaterThan(20);
        intelService.stopData(exchange, pair, type);
        done();
      });
    });

    it('transaction', (done) => {
      const type = IntelChannel.Transaction;
      intelService.data$(exchange, pair, type).subscribe((res) => {
        expect(res.channel).toEqual(type);
        expect(res.data).toBeDefined();
        expect((<Transaction>res.data).price).toBeGreaterThan(0);
        expect((<Transaction>res.data).time).toBeGreaterThan(0);
        intelService.stopData(exchange, pair, type);
        done();
      });
    });

    it('not found spy implemention', () => {
      expect(() => intelService.data$(exchange, pair, <any>'test')).toThrowError(
        new IntelServiceException(`not found spy implemention, for exchange: ${exchange}, symbol: ${pair}, channel: test`),
      );
    });
  });
});
