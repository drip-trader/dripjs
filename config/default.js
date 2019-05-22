require('dotenv').config();

module.exports = {
  env: 'default',
  production: false,
  database: {
    type: 'mysql',
    replication: {
      master: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'test',
      },
      slaves: [
        {
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: process.env.MYSQL_PASSWORD,
          database: 'test',
        },
      ],
    },
    entities: ['dist/modules/models/entity/**/*.entity.js'],
  },
  container: {
    intelService: {
      port: 6531,
      username: 'test',
      password: 'test',
    },
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
    },
  },
  log: {
    typeorm: true,
  },
};
