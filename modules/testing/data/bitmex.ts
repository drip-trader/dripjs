// tslint:disable-next-line
require('dotenv').config();

import { Bitmex } from '@dripjs/exchanges';

export const realConfig: Bitmex.Config = {
  apiKey: `${process.env['SPEC_BITMEX_REAL_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_REAL_API_SECRET']}`,
  testnet: false,
};

export const testnetConfig: Bitmex.Config = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_API_SECRET']}`,
  testnet: true,
};

export const testnetReadonlyConfig: Bitmex.Config = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_TRADE_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_TRADE_API_SECRET']}`,
  testnet: true,
};
