import { Depth, SupportedExchange, Ticker, Transaction } from '@dripjs/types';

import { Resolution } from '../../core';
import { IntelServiceException } from '../exceptions';
import { IntelChannel } from '../types';
import { IntelService } from './intel.service';

describe('IntelService', () => {
  let intelService: IntelService;
  const symbol = 'XBTUSD';

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
    const resolution = Resolution.day;
    const end = Date.now();
    const start = end - 1000 * 60 * 60 * 24 * 60;
    it('is not supported', async () => {
      const exchange = 'testEx';
      await expect(intelService.getBars({ exchange, symbol, resolution, start, end })).rejects.toEqual(
        new IntelServiceException(
          `Exchange ${exchange} is not supported, now lists of supported exchanges: ${Object.values(SupportedExchange)}`,
        ),
      );
    });

    it('return bars', async () => {
      const exchange = SupportedExchange.Bitmex;
      const bars = await intelService.getBars({ exchange, symbol, resolution, start, end });
      expect(bars.length).toBeGreaterThan(0);
    });
  });

  describe('subscribe', () => {
    const exchange = SupportedExchange.Bitmex;

    afterAll(() => {
      intelService.stopData(exchange, symbol);
      intelService.close();
    });

    it('ticker', (done) => {
      const channel = IntelChannel.Ticker;
      intelService.data$({ exchange, symbol, channel }).subscribe((res) => {
        expect(res.channel).toEqual(channel);
        expect(res.data).toBeDefined();
        expect((<Ticker>res.data).ask).toBeGreaterThan(0);
        expect((<Ticker>res.data).bid).toBeGreaterThan(0);
        intelService.stopData(exchange, symbol, channel);
        done();
      });
    });

    it('depth', async (done) => {
      const channel = IntelChannel.Depth;
      intelService.data$({ exchange, symbol, channel }).subscribe((res) => {
        expect(res.channel).toEqual(channel);
        expect(res.data).toBeDefined();
        expect((<Depth>res.data).asks.length).toBeGreaterThan(20);
        expect((<Depth>res.data).bids.length).toBeGreaterThan(20);
        intelService.stopData(exchange, symbol, channel);
        done();
      });
    });

    it('transaction', (done) => {
      const channel = IntelChannel.Transaction;
      intelService.data$({ exchange, symbol, channel }).subscribe((res) => {
        expect(res.channel).toEqual(channel);
        expect(res.data).toBeDefined();
        expect((<Transaction>res.data).price).toBeGreaterThan(0);
        expect((<Transaction>res.data).time).toBeGreaterThan(0);
        intelService.stopData(exchange, symbol, channel);
        done();
      });
    });

    it('not found spy implemention', () => {
      expect(() => intelService.data$({ exchange, symbol, channel: <any>'test' })).toThrowError(
        new IntelServiceException(`not found spy implemention, for exchange: ${exchange}, symbol: ${symbol}, channel: test`),
      );
    });
  });
});
