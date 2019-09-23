import { Logger } from '../../../../../../common/logger';
import { testnetConfig } from '../../../../common';
import { MAX_REMAINING_NUM, MINIMUM_REMAINING_NUM } from '../../../../constants';
import { ErrorResponse } from '../../../../types';
import { RestInstrumentResponse } from '../../../types';
import { Instrument } from './instrument';

describe('Bitmex Rest Instrument', () => {
  const logger = new Logger('log/test.log');
  const instrument = new Instrument(testnetConfig);

  it('fetch instrument', async () => {
    const res = (await instrument.fetch()) as RestInstrumentResponse;
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.ratelimit.limit).toEqual(MAX_REMAINING_NUM);
  });

  it('fetch instrument of remaining < mininum', async () => {
    (<any>instrument).remaining = MINIMUM_REMAINING_NUM - 1;
    const res = (await instrument.fetch()) as ErrorResponse;
    logger.info(res, '结果');
    expect(res.error).toBeDefined();
    expect(res.error.message).toEqual(`The remaining(${(<any>instrument).remaining}) is less than ${MINIMUM_REMAINING_NUM}`);
  });
});
