// const { generateGameJoinCompanies } = require('../utils');

// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('game_join_companies').del()
//     .then(() => {
//       // Inserts seed entries
//       return knex('game_join_companies').insert(generateGameJoinCompanies());
//     });
// };


const path = require('path');
const seedFile = require('knex-seed-file');


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('game_join_companies').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw("COPY game_join_companies (id_game,id_developer,id_publisher,id_platform) FROM '/home/andyoe/Desktop/gameDescription/db/seeds/JoinTable_test.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER)")
    });
};