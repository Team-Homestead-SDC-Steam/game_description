const faker = require('faker');
const fs = require('fs');



const writeDescriptions = fs.createWriteStream('descriptions.csv');
const writeJoinTable = fs.createWriteStream('JoinTable.csv');

writeDescriptions.write('descriptions,release_date\n', 'utf8');
writeJoinTable.write('id_game,id_developer,id_publisher,id_platform\n','utf8');



function writeTenMillionDescriptions(writer, encoding, callback) {
  let i = 10000000;
  // let i = 1000
  let id = 0;
  let msIn10Years = 1000 * 60 * 60 * 24 * 365 * 10;


  //write function goes through while loop to generate data and write a row of data into 
  //a file for each loop.
  
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let release_date = new Date(Date.now() - Math.floor(Math.random() * msIn10Years)).toISOString();
      let description = faker.fake('{{lorem.paragraph}} {{lorem.paragraph}}');
      let data = `${description},${release_date}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}


function writeTenMillionJoinTables(writer, encoding, callback) {
  let i = 10000000;
  // let i = 1000;
  let id = 0;

  //Primary key will be the id of the table
  let primaryKey = 0;
  


  //write function goes through while loop to generate data and write a row of data into 
  //a file for each loop.
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let platformIds = [1, 2, 3];
      let seedArray = new Array(Math.ceil(Math.random() * 3)).fill(id);
      for(let j = 0; j<seedArray.length ; j++){
        primaryKey++
        let developer = Math.ceil(Math.random() * 50);
        let publisher =  Math.ceil(Math.random() * 50);
        let randIdx = Math.floor(Math.random() * platformIds.length);
        let id_platform = platformIds[randIdx];
        platformIds.splice(randIdx, 1);

        let data = `${id},${developer},${publisher},${id_platform}\n`

        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
      }

      
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}



writeTenMillionDescriptions(writeDescriptions,'utf-8',() =>{
  console.log('finished description')
    writeDescriptions.end();
});

writeTenMillionJoinTables(writeJoinTable,'utf-8',() =>{
  console.log('finished joinTable')
  writeJoinTable.end();
})

