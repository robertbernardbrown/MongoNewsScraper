var express     = require("express");
var app         = express();
var cheerio     = require("cheerio");
var request     = require("request");
var mongoose    = require("mongoose");
var async       = require("async")
var db          = require("../models");
var databaseUrl = "mongodb://localhost:27017/scrape";
mongoose.connect(databaseUrl);
mongoose.connection.on('error', function (err) {
  console.error('connection error: ' + err);
});
var url = "https://hackernoon.com/tagged/software-development";

function storeData(error, response, html){
  if (error) throw error;
  var $ = cheerio.load(html);
    // mongoose.connection.db.dropCollection("articles");
    $(".postArticle").each(function (i, element) {
      let item = {
        author: $(element).find("[data-user-id]").text(),
        title: $(element).find(".graf--title").text(),
        image: $(element).find("img").attr("src"),
        date: $(element).find("time").text(),
        url: $(element).find(".postArticle-content").parent().attr("href")
      }
      db.Article.create(item);
      console.log("done" + i);
    })
}
module.exports = 
function fetchData(url){
  request(url, storeData);
}