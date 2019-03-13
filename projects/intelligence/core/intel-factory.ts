import { Bitmex } from 'dripjs-exchanges';

import { BitmexSpy } from './spy';

export type Spy = BitmexSpy;
export type SpyConfig = Bitmex.Config;

export class IntelFactory {
  static create<T extends Spy>(intel: new (config: SpyConfig) => T, config: SpyConfig): T {
    return new intel(config);
  }
}
