const path = require('path');
require('dotenv').config()
module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: process.env.PG_PASS || '',
      database: 'steam_game_descriptions_test'
    },
    migrations: {
      directory: path.resolve(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'test', 'fixtures', 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: process.env.PGDB_URI || {
      host: '127.0.0.1',
      user: 'postgres',
      password: process.env.PG_PASS||'',
      database: 'steam_game_descriptions'
    },
    migrations: {
      directory: path.resolve(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'db', 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.PGDB_URI,
    migrations: {
      directory: path.resolve(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'db', 'seeds', 'production')
    }
  }
};
