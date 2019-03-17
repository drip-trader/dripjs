import { Spy, SpyConfig } from './types';

export class IntelFactory {
  static create<T extends Spy>(intel: new (config: SpyConfig) => T, config: SpyConfig): T {
    return new intel(config);
  }
}
