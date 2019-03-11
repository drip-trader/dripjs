import { SupportedExchange } from 'dripjs-types';

import { IntelServiceException } from '../exceptions';
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
});
