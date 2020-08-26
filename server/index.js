require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const app = express();
const bodyParser = require('body-parser')

const { getGameInfo ,deleteGameInfo ,addGameInfo, putGameInfo } = require('../db/index');

console.log(process.env.NODE_ENV)

app.use(express.json());
app.use(cors());
app.use('/', expressStaticGzip(path.resolve(__dirname, '..', 'public')));

app.get('/app/:gameid', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/description/:gameid', async (req, res) => {
  const { gameid } = req.params;
  if (gameid < 1 || gameid > 100) {
    res.status(400).json({ error: 'Invalid game id' });
    return;
  }
  try {
    let gameInfo = await getGameInfo(gameid);
    res.status(200).json(gameInfo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error retrieving game description' });
  }
});



app.post('/api/description', async (req,res) => {

  const info = req.body;
  try {
    let addGame = await addGameInfo(info);
    res.status(200).json(info);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error retrieving game description' });
  }
})

app.put('/api/description/:gameid', async (req,res) => {

  const { gameid } = req.params;
  const info = req.body;

  if (gameid < 1 || gameid > 100) {
    res.status(400).json({ error: 'Invalid game id' });
    return;
  }

  try {
    let putGame = await putGameInfo(info,gameid);
    res.status(200).json(putGame);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error retrieving game description' });
  }
})

app.delete('/api/description/:gameid', async (req,res) => {
  const { gameid } = req.params;
  if (gameid < 1 || gameid > 100) {
    res.status(400).json({ error: 'Invalid game id' });
    return;
  }


  try {
    let deletegameInfo = await deleteGameInfo(gameid);
    res.status(200).json(deletegameInfo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error deleting game description' });
  }
})



app.get('/api/media/:gameid', (req, res) => {
  fetch(`http://ec2-18-188-192-44.us-east-2.compute.amazonaws.com:3004/api/media/${req.params.gameid}`)
    .then(response => response.json())
    .then(results => {
      res.status(200).json(results);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: 'Error fetching game media' });
    });
});

app.get('/api/reviewcount/recent/:gameid', (req, res) => {
  fetch(`http://ec2-54-185-79-51.us-west-2.compute.amazonaws.com:3002/api/reviewcount/recent/${req.params.gameid}`)
    .then(response => response.json())
    .then(results => {
      res.status(200).json(results);
    })
    .catch(e => {
      console.error(e)
      res.status(500).json({ error: 'Error fetching recent review count' });
    });
});

app.get('/api/reviewcount/:gameid', (req, res) => {
  fetch(`http://ec2-54-185-79-51.us-west-2.compute.amazonaws.com:3002/api/reviewcount/${req.params.gameid}`)
    .then(response => response.json())
    .then(results => {
      res.status(200).json(results);
    })
    .catch(e => {
      console.error(e)
      res.status(500).json({ error: 'Error fetching overallreview count' });
    });
});

const server = app.listen(process.env.PORT || 3005, () => {
  console.log(`Server listening on ${process.env.PORT || 3005}`);
});

// Export for route tests
module.exports = { app, server };
