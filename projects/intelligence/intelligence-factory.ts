import { Bitmex } from '@dripjs/exchanges';

import { BitmexSpy } from './spy';

export type Spy = BitmexSpy;
export type SpyConfig = Bitmex.Config;

export class IntelligenceFactory {
  static create<T extends Spy>(intelligence: new (config: SpyConfig) => T, config: SpyConfig): T {
    return new intelligence(config);
  }
}
