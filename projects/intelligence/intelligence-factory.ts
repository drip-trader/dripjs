import { BitmexConfig } from '@dripjs/exchanges';

import { Bitmex } from './spy';

export type Spy = Bitmex;
export type SpyConfig = BitmexConfig;

export class IntelligenceFactory {
  static create<T extends Spy>(intelligence: new (config: SpyConfig) => T, config: SpyConfig): T {
    return new intelligence(config);
  }
}
