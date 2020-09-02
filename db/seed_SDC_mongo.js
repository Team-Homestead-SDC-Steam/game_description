const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

var data = JSON.parse(fs.readFileSync('descriptionJSON_test.json','utf8'));

const mongoURI = 'mongodb://localhost:27017/gamedescription';

mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
    mongoose.connection.db.dropDatabase();

    var descriptionSchema = new mongoose.Schema({
        id: Number,
        description:String,
        release_date: Date,
        developers:Array,
        publishers:Array
    });

    var Description = mongoose.model('descriptions',descriptionSchema);

    Description.insertMany(data, (err,res)=>{
        if(err){
            console.log('error')
        }else{
            mongoose.connection.close()
        }
    })

})


