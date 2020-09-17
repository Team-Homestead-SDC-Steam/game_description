const { json } = require('body-parser');
const db = require('./knex');

/**
 * @param {String} gameid
 * @returns {Array} array whose first and only entry is game description object
 */
const getDescById = (gameid) => {
  return db('descriptions')
    .where('id', gameid);
};

const deleteDescById = (gameid) =>{
  return db('descriptions')
    .where('id', gameid)
    .del();
}

const addDesc = (gameId,description,release_date) =>{
  return db('descriptions')
    .insert({
      id:gameId,
      description:description, 
      release_date:release_date}
    )
}

const addJoinTable = (gameId,developer,publisher,platform,tableId) =>{
  return db('game_join_companies')
    .insert({
      id:tableId,
      id_game:gameId, 
      id_developer:Number(developer[0].id),
      id_publisher:Number(publisher[0].id), 
      id_platform:Number(platform[0].id) }
      )
}

const updateDesc = (description,release_date,gameid) =>{
  return db('descriptions')
    .where('id', gameid)
    .update({
      description:description,
      release_date: release_date
    })
}

const deleteJoinTable = (gameid) =>{
  return db('game_join_companies')
    .where('id_game',gameid)
    .del()
}

/**
 * Gets game description, release date, and all developers and publishers for a gameid
 * @param {Number} gameid
 * @returns {Object}
 */
exports.getGameInfo = async (gameid) => {

  let devPubInfo = await db('game_join_companies')
    .where('id_game', gameid)
    .orderBy('id_platform');

  let [gameJSON] = await getDescById(gameid);
  gameJSON.developers = [];
  gameJSON.publishers = [];

  for (let i = 0; i < devPubInfo.length; i++) {
    let [developer] = await db('companies')
      .where('id', devPubInfo[i].id_developer);
    let [publisher] = await db('companies')
      .where('id', devPubInfo[i].id_publisher);
    let [platform] = await db('platforms')
      .where('id', devPubInfo[i].id_platform);
    developer.platform = platform.platform;
    publisher.platform = platform.platform;
    gameJSON.developers.push(developer);
    gameJSON.publishers.push(publisher);
  }

  return gameJSON;
};


exports.deleteGameInfo = async (gameid) =>{

  let deleteInfo = await db('game_join_companies')
    .where('id_game',gameid)
    .del();

  let deleteDescription = await deleteDescById(gameid);

  return deleteDescription;
}

exports.addGameInfo = async (info) =>{
  let {description,release_date,developers,publishers} = info;

  if(typeof developers ==='string' || typeof publishers === 'string'){
    developers = JSON.parse(developers);
    publishers = JSON.parse(publishers);
  }
  let dataLength = await db('descriptions')
    .max('id');

  let gameId = Number(dataLength[0].max) + 1;

  let addDescription = await addDesc(gameId,description,release_date);

  for (let i = 0; i<developers.length; i++){
    let developer = await db('companies')
      .where('company',developers[i].company)
    let publisher = await db('companies')
      .where('company',publishers[i].company)
    let platform = await db('platforms')
      .where('platform',developers[i].platform)
    
    let joinTableData = await db('game_join_companies')
      .max('id');


    let tableId = Number(joinTableData[0].max) + 1;

    let joinTable = await addJoinTable(gameId,developer,publisher,platform,tableId)
  }

  return gameId;
};

exports.putGameInfo = async(info,gameid) => {
  let {description,release_date,developers,publishers} = info;

  let updateDescription = await updateDesc(description,release_date,gameid);
  let deleteInfo = await db('game_join_companies')
    .where('id_game',gameid)
    .del();

  for (let i = 0; i<developers.length; i++){
      let developer = await db('companies')
        .where('company',developers[i].company)
      let publisher = await db('companies')
        .where('company',publishers[i].company)
      let platform = await db('platforms')
        .where('platform',developers[i].platform)
      
      let joinTableData = await db('game_join_companies')
        .max('id');
  
  
      let tableId = Number(joinTableData[0].max) + 1;
  
      let joinTable = await addJoinTable(gameid,developer,publisher,platform,tableId)
  }

  return gameid


}