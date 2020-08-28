const faker = require('faker');
const fs = require('fs');



const writeDescriptions = fs.createWriteStream('descriptions.csv');

writeDescriptions.write('id,descriptions,release_date\n', 'utf8');


function writeTenMillionDescriptions(writer, encoding, callback) {
  let i = 10000000;
  let id = 1;
  let msIn10Years = 1000 * 60 * 60 * 24 * 365 * 10;


  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let release_date = new Date(Date.now() - Math.floor(Math.random() * msIn10Years)).toISOString();
      let description = faker.fake('{{lorem.paragraph}} {{lorem.paragraph}}');
      let data = `${id},${description},${release_date}\n`;
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

writeTenMillionDescriptions(writeDescriptions,'utf-8',() =>{
    writeDescriptions.end();
  
});



