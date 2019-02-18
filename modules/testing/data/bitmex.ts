// tslint:disable-next-line
require('dotenv').config();

import { Config } from '@dripjs/exchanges';

export const testnetConfig: Config = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_API_SECRET']}`,
  testnet: true,
};

export const testnetReadonlyConfig: Config = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_TRADE_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_TRADE_API_SECRET']}`,
  testnet: true,
};
