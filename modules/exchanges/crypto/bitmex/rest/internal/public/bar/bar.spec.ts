import { testnetConfig } from '@dripjs/testing';

import { Resolution } from '../../../../types';
import { Bar } from './bar';

describe('Bitmex RestInsider Bar', () => {
  const bar = new Bar(testnetConfig);

  it('fetch instrument', async () => {
    const res = await bar.fetch({
      binSize: Resolution.day,
      symbol: 'XBTUSD',
    });
    expect(res.bars.length).toEqual(100);
  });
});
