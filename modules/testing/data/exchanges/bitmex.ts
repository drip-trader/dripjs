try {
  // tslint:disable-next-line
  require('dotenv').config();
} catch (e) {}

export const realConfig = {
  apiKey: `${process.env['SPEC_BITMEX_REAL_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_REAL_API_SECRET']}`,
  testnet: false,
};

export const testnetConfig = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_API_SECRET']}`,
  testnet: true,
};

export const testnetReadonlyConfig = {
  apiKey: `${process.env['SPEC_BITMEX_TEST_TRADE_API_KEY']}`,
  apiSecret: `${process.env['SPEC_BITMEX_TEST_TRADE_API_SECRET']}`,
  testnet: true,
};
