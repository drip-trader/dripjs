require('dotenv').config();

module.exports = {
  env: 'default',
  production: false,
  container: {
    intelService: {
      port: 6531,
      username: 'test',
      password: 'test2',
    }
  },
  exchange: {
    crypto: {
      bitmex: {
        apiKey: process.env.SPEC_BITMEX_REAL_API_KEY,
        apiSecret: process.env.SPEC_BITMEX_REAL_API_SECRET,
      },
      bitmexTestNet: {
        apiKey: process.env.SPEC_BITMEX_TEST_API_KEY,
        apiSecret: process.env.SPEC_BITMEX_TEST_API_SECRET,
      },
    }
  }
};
