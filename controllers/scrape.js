var express     = require("express");
var app         = express();
var cheerio     = require("cheerio");
var request     = require("request");
var mongoose    = require("mongoose");
var databaseUrl = "mongodb://localhost:27017/scrape";
mongoose.connect(databaseUrl);
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  author: {type: String},
  title: {type: String},
  image: {type: String},
  date: {type: String},
  url: {type: String},
})

var ArticleData = mongoose.model("ArticleData", articleSchema)

module.exports = function getData (){
  request("https://hackernoon.com/tagged/software-development", function(error, response, html) {
    var $ = cheerio.load(html);
    mongoose.connection.db.dropCollection("articledatas");
    $(".postArticle").each(function(i, element) {
      let item = {
        author: $(element).find("[data-user-id]").text(),
        title: $(element).find(".graf--title").text(),
        image: $(element).find("img").attr("src"),
        date: $(element).find("time").text(),
        url: $(element).find(".postArticle-content").parent().attr("href")
      }
      var data = new ArticleData(item);
      data.save();
      console.log("done");
    });
    // mongoose.connection.close()
    console.log("Alldone");
  });
}