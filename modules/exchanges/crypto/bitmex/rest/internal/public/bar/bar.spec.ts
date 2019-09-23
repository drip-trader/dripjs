import { testnetConfig } from '../../../../common';
import { MAX_REMAINING_NUM } from '../../../../constants';
import { Resolution } from '../../../../types';
import { RestBarResponse } from '../../../types';
import { Bar } from './bar';

describe('Bitmex Rest Bar', () => {
  const bar = new Bar(testnetConfig);

  it('fetch instrument', async () => {
    const res = (await bar.fetch({
      binSize: Resolution.day,
      symbol: 'XBTUSD',
    })) as RestBarResponse;
    expect(res.data.length).toEqual(100);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });
});
