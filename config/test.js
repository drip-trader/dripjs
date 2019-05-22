/**
 * Config for test in local development (run on ts-node).
 *
 * Jest force set NODE_ENV=test
 * https://github.com/facebook/jest/issues/3370
 */

const config = require('./default');

config.env = 'test';

config.database = {
  ...config.database,
  entities: ['modules/models/entity/**/*.entity.ts'],
};
config.log = {
  typeorm: false,
};

module.exports = config;
