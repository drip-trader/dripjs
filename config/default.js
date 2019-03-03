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
  log: {
    typeorm: true,
  },
};
