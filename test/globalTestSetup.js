const knex = require('knex');
require('dotenv').config()

const createDb = async () => {
  const dbConnection = knex({
    client: 'postgres',
    debug: true,
    connection: {
      host: '127.0.0.1',
      database: 'postgres',
      port: '5432',
      password: process.env.PG_PASS||'',
      user: 'postgres'
    }
  });

  try {
    await dbConnection.raw('CREATE DATABASE steam_game_descriptions_test');
  } catch (e) {
    console.error(e);
  } finally {
    await dbConnection.destroy();
  }
};

module.exports = async () => {
  await createDb();
};