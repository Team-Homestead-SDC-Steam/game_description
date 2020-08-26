// Game-companies join table, since a game can have multiple companies as their developers and publishers.
exports.up = function(knex) {
  return knex.raw(
    'CREATE TABLE game_join_companies (' +
      'id SERIAL PRIMARY KEY,' +
      'id_game INTEGER NOT NULL,' +
      'id_developer INTEGER REFERENCES companies(id),' +
      'id_publisher INTEGER REFERENCES companies(id),' +
      'id_platform INTEGER REFERENCES platforms(id)' +
    ')'
  );
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('game_join_companies');
};
