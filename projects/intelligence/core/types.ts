import { Bitmex } from '@dripjs/exchanges';

import { BitmexSpy } from './spy';

export type Spy = BitmexSpy;
export type SpyConfig = Bitmex.Config;

export enum Resolution {
  min1 = '1m',
  min5 = '5m',
  hour = '1h',
  day = '1d',
}
