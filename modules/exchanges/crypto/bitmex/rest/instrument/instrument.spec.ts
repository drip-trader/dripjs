import { testnetConfig } from '../../common';
import { Instrument } from './instrument';

describe('Bitmex Rest Instrument', () => {
  const instrument = new Instrument(testnetConfig);

  it('fetch instrument', async () => {
    const res = await instrument.fetch();
    expect(res.instruments.length).toBeGreaterThan(0);
    expect(res.ratelimit.limit).toEqual(300);
  });

  it('fetch instrument of remaining < 20', async () => {
    (<any>instrument).remaining = 10;
    const res = await instrument.fetch();
    expect(res.error).toBeDefined();
    expect(res.error!.name).toEqual('validate failed (remaining)');
    expect(res.error!.message).toEqual('The remaining is less than 20');
  });
});
