import { BitmexRest, RestOrderbookL2Response } from '@dripjs/exchanges';
import { testnetConfig } from '@dripjs/testing';

export class Intelligence {
  private readonly bitmexRest: BitmexRest;

  constructor() {
    this.bitmexRest = new BitmexRest(testnetConfig);
  }

  async getOrderbook(symbol: string): Promise<RestOrderbookL2Response> {
    return this.bitmexRest.fetchOrderbook({
      symbol,
      depth: 25,
    });
  }
}
