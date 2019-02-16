
import { Config } from '../types';

export class BitmexRestBase {
  protected config: Config;

  constructor(config?: Config) {
    this.config = {
      apiKey: '',
      apiSecret: '',
      testnet: false,
      ...config,
    };
  }
}
