import { BitmexRest, RestOrderbookL2Response } from '@drip/exchanges';
import { testnetConfig } from '@drip/testing';

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
