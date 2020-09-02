

// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('descriptions').del()
//     .then(() => {
//       // Inserts seed entries
//       return knex('descriptions').insert(generateGameDesc());
//     });
// };
const path = require('path');
const seedFile = require('knex-seed-file');
const fs= require('fs');




exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('descriptions').del()
    .then(() => {
      // Inserts seed entries
      return knex.raw("COPY descriptions (description,release_date) FROM '/home/andyoe/Desktop/gameDescription/db/seeds/descriptions_test.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);")
    });
};


// exports.seed = function(knex) {

//   knex('descriptions').del()
//     .then(()=>{
//       console.log('d')
//       return new Promise(function(resolve,reject){
//         console.log('what is happenenig')
//         const stream = fs.createReadStream('./descriptions_test.csv').setEncoding('utf8');

//         let splitEnd = '';

//         let mapTo = ['id','descriptions','release_date'];

//         const inserts = [];

//         console.log('ddddddd');

//         let ignoreFirstLine = true;
//         let useFirstLineForColumns= true;

//         stream.on('data',function(chunk){
//           const tempRows = chunk.split('\n');
//           if(splitEnd.length > 0){
//             tempRows[0] = splitEnd + tempRows[0];
//             splitEnd='';
//           }

//           if (!tempRows[tempRows.length-1].endsWith('\n')) {
//             splitEnd = tempRows.pop();
//           }

//           if (ignoreFirstLine || useFirstLineForColumns) {
//             if (useFirstLineForColumns) {
//               mapTo = tempRows.shift().split(columnSeparator);
//             } else {
//               tempRows.shift();
//             }
//             ignoreFirstLine = false;
//             useFirstLineForColumns = false;
//           }

//           tempRows.map(function(row){
//             const cols = row.split(',');
//             const knexRow = {};

//             mapTo.map(function(key, index) {
//               if (key === null) {
//                 return;
//               }
//               try {
//                 knexRow[key] = cols[index] ? JSON.parse(cols[index]) : null;
//               } catch (e) {
//                 knexRow[key] = cols[index];
//               }
//             });
//             inserts.push(knexRow);
//           })
//         });

//         stream.on('end', function() {

//           console.log('end');

//           handleInsert(inserts, 'descriptions')
//               .then(resolve);
//         });
//       })
//     });
// };