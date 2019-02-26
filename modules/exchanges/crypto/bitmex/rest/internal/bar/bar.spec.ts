import { testnetConfig } from '../../../common';
import { Resolution } from '../../../types';
import { Bar } from './bar';

describe('Bitmex Rest Bar', () => {
  const bar = new Bar(testnetConfig);

  it('fetch instrument', async () => {
    const res = await bar.fetch({
      binSize: Resolution.day,
      symbol: 'XBTUSD',
    });
    expect(res.bars.length).toEqual(100);
    expect(res.ratelimit.limit).toEqual(300);
  });
});
