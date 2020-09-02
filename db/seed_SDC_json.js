const fs = require('fs');
const path = require('path');
const faker = require('faker');


const writejson = fs.createWriteStream('descriptionJSON_test.json');
writejson.write('[')


let companyTable = [
    { id: 1, company: 'Nintendo' },
    { id: 2, company: 'Konami' },
    { id: 3, company: 'Valve' },
    { id: 4, company: 'Rockstar Games' },
    { id: 5, company: 'Activision' },
    { id: 6, company: 'Ubisoft' },
    { id: 7, company: 'BioWare' },
    { id: 8, company: 'Naughty Dog' },
    { id: 9, company: 'Square Enix' },
    { id: 10, company: 'Bungie' },
    { id: 11, company: 'Mojang' },
    { id: 12, company: 'Take-Two Interactive' },
    { id: 13, company: 'Blizzard Entertainment' },
    { id: 14, company: 'Bethesda' },
    { id: 15, company: 'Grinding Gear Games' },
    { id: 16, company: 'Aspyr' },
    { id: 17, company: 'Annapurna Interactive' },
    { id: 18, company: 'Mobius Digital' },
    { id: 19, company: 'Microsoft' },
    { id: 20, company: 'Bluehole' },
    { id: 21, company: 'Electric Arts' },
    { id: 22, company: 'RedSpotGames' },
    { id: 23, company: 'Acheron Design' },
    { id: 24, company: 'THQ' },
    { id: 25, company: 'Panasonic' },
    { id: 26, company: 'Hero Concept' },
    { id: 27, company: 'Ngmoco' },
    { id: 28, company: 'Maxis' },
    { id: 29, company: 'Riot' },
    { id: 30, company: 'PopCap Games' },
    { id: 31, company: 'Zynga' },
    { id: 32, company: 'Harmonix' },
    { id: 33, company: 'PlayFirst' },
    { id: 34, company: 'Obeorn Media' },
    { id: 35, company: 'Ludia' },
    { id: 36, company: 'Sulake' },
    { id: 37, company: 'Gaikai' },
    { id: 38, company: 'Epic Games' },
    { id: 39, company: 'Alawar' },
    { id: 40, company: 'Portalarium' },
    { id: 41, company: 'Smule' },
    { id: 42, company: 'Atari' },
    { id: 43, company: 'Ritual' },
    { id: 44, company: 'Yousician' },
    { id: 45, company: 'Gamevil' },
    { id: 46, company: 'Kaneva' },
    { id: 47, company: 'Mentez' },
    { id: 48, company: 'Spicy Horse' },
    { id: 49, company: 'Activision' },
    { id: 50, company: 'Cellufun' }
]

let platformTable = [
    { id: 1, platform: 'Windows' },
    { id: 2, platform: 'Mac' },
    { id: 3, platform: 'Linux' }
]



function writeJsonData(id) {
    let i = id;
    let msIn10Years = 1000 * 60 * 60 * 24 * 365 * 10;



    let platformIds = [1, 2, 3];

    let obj = {
        id: i,
        description: faker.fake('{{lorem.paragraph}} {{lorem.paragraph}}'),
        release_date: new Date(Date.now() - Math.floor(Math.random() * msIn10Years)).toISOString(),
        developers: [],
        publishers: []

    }

    let randomNumber = Math.ceil(Math.random() * 3);

    for (let j = 0; j < randomNumber; j++) {

        let randIdx = Math.floor(Math.random() * platformIds.length);
        let randomPlatform = platformIds[randIdx];
        platformIds.splice(randIdx, 1);

        let copyCompanyTable = Array.from(companyTable)

        let randomDevObj = copyCompanyTable[Math.ceil(Math.random() * 50) - 1];
        let randomPubObj = copyCompanyTable[Math.ceil(Math.random() * 50) - 1];


        randomDevObj['platform'] = platformTable[randomPlatform - 1];
        randomPubObj['platform'] = platformTable[randomPlatform - 1];

        obj.developers.push(randomDevObj);
        obj.publishers.push(randomPubObj);

    }

    return obj



}


function writeTenMillionJson(writer,encoding,callback){
  let i = 1000;
  // let i = 1000
  let id =0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      if(id !== 1000){
        var data = JSON.stringify(writeJsonData(id))+','
      }else{
        var data = JSON.stringify(writeJsonData(id))
      }
      
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

writeTenMillionJson(writejson,'utf-8', ()=>{
    writejson.write(']')
    console.log('finished json')
    writejson.end();
})


// {
//     "id": 14,
//     "description": "Dolorem mollitia veniam sed. Sapiente corporis perspiciatis eveniet architecto perferendis culpa qui aliquid. Est laboriosam facere. Consequatur sequi quibusdam nam cumque neque. Dolor eligendi est quae dolorem harum nobis. Veritatis dignissimos dolorum quas sit eius repellat et dignissimos quibusdam. Esse quo qui aut. Fugiat sit et natus illo omnis sequi sunt unde aut. Dignissimos doloribus molestiae amet aliquam expedita qui sunt autem.",
//     "release_date": "2019-09-09T00:00:00Z",
//     "developers": [
//         {
//             "id": 5,
//             "company": "Activision",
//             "platform": "Linux"
//         }
//     ],
//     "publishers": [
//         {
//             "id": 17,
//             "company": "Annapurna Interactive",
//             "platform": "Linux"
//         }
//     ]
// }