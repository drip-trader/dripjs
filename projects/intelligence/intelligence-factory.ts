import { Config } from '@dripjs/exchanges';

import { Bitmex } from './spy';

export type Spy = Bitmex;

export class IntelligenceFactory {
  static create<T extends Spy>(intelligence: new (config: Config) => T, config: Config): T {
    return new intelligence(config);
  }
}
