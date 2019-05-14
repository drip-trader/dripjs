import { overrideTimestampColumns } from './override-timestamp-columns';

describe('overrideTimestampColumns', () => {
  describe('When shallow object', () => {
    it('should override target key', () => {
      expect(
        overrideTimestampColumns({
          timestamp: 1,
        }),
      ).toEqual({
        timestamp: 'overridden',
      });
    });
  });

  describe('When deep object', () => {
    it('should override target key', () => {
      expect(
        overrideTimestampColumns({
          ratelimit: {
            reset: 1556514078,
          },
          orders: [
            {
              openingTimestamp: '2019-04-29T05:00:00.000Z',
              currentTimestamp: '2019-04-29T05:01:16.083Z',
              timestamp: '2019-04-29T05:01:16.083Z',
            },
          ],
        }),
      ).toEqual({
        ratelimit: {
          reset: 'overridden',
        },
        orders: [
          {
            openingTimestamp: 'overridden',
            currentTimestamp: 'overridden',
            timestamp: 'overridden',
          },
        ],
      });
    });
  });
});
