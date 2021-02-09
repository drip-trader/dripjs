import { testnetConfig } from '@dripjs/testing';
import { Subject } from 'rxjs';

import { MAX_REMAINING_NUM, MINIMUM_REMAINING_NUM } from '../../../constants';
import { Instrument } from './instrument';

describe('Bitmex Rest Instrument', () => {
  const remaining$ = new Subject<number>();
  const instrument = new Instrument(testnetConfig, remaining$);

  it('fetch instrument', (done) => {
    instrument.fetch().subscribe((res) => {
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.rateLimit.limit).toEqual(MAX_REMAINING_NUM);
      done();
    });
  });

  it('fetch instrument of remaining < mininum', (done) => {
    const remaining = MINIMUM_REMAINING_NUM - 1;
    remaining$.next(remaining);
    instrument.fetch().subscribe(
      (res) => {},
      (error) => {
        expect(error.message).toEqual(`The remaining(${remaining}) is less than ${MINIMUM_REMAINING_NUM}`);
        done();
      },
    );
  });
});
