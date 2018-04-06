var express     = require("express");
var app         = express();
var cheerio     = require("cheerio");
var request     = require("request");
var mongoose    = require("mongoose");
var db          = require("../models");
var databaseUrl = "mongodb://localhost:27017/scrape";
mongoose.connect(databaseUrl);
mongoose.connection.on('error', function (err) {
  console.error('connection error: ' + err);
});

function displayData(error, collection){
  if (error) throw error;
    db.Article.find({})
    .then(function(err,data){
        if (err) throw err;
        console.log(data);
    })
    .catch(e=>{
        console.error(e);
    });
};

displayData();

module.exports = displayData;