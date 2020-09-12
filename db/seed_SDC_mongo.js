const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

// var data = JSON.parse(fs.readFileSync('descriptionJSON.json','utf8'));
var JSONStream = require('JSONStream')

var stream = fs.createReadStream('descriptionJSON.json')
var transformStream = JSONStream.parse("*");

const mongoURI = 'mongodb://localhost:27017/gamedescription';

mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    mongoose.connection.db.dropDatabase();

    var descriptionSchema = new mongoose.Schema({
        id: Number,
        description: String,
        release_date: Date,
        developers: Array,
        publishers: Array
    });

    var Description = mongoose.model('descriptions', descriptionSchema);

   

    stream
        .pipe(transformStream)
        .on("data", (obj) => {
            Description.insertMany(obj)
        })
        .on("end", () => {
            console.log('finished seeding data into mongodb')
            mongoose.connection.close();
        })
  
})






