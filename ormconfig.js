const config = require('config');
const { property, isObject } = require('lodash');

// Check core config
const dbConfig = property('database')(config);
if (!isObject(dbConfig) || dbConfig.type !== 'mysql') {
  throw new Error(`Invalid 'database' config: ${JSON.stringify(config)}`);
}

module.exports = {
  ...config.database,
  name: 'default',
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  supportBigNumbers: true,
  bigNumberStrings: true,
  logging: config.log.typeorm,
};
