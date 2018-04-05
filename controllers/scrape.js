var express     = require("express");
var app         = express();
var cheerio     = require("cheerio");
var request     = require("request");
var mongojs     = require("mongojs");
var databaseUrl = "scrapeDB";
var collections = ["scrapedData"];
var mongojs     = require('mongojs')
var db          = mongojs(databaseUrl, collections)
db.on("error", function(error) {
  console.log("Database Error:", error);
});

request("https://hackernoon.com/tagged/software-development", function(error, response, html) {
  var $ = cheerio.load(html);
  db.scrapedData.drop();
  db.collections.drop();
  $(".postArticle").each(function(i, element) {
    let author = $(element).find("[data-user-id]").text();
    let title = $(element).find(".graf--title").text();
    let image = $(element).find("img").attr("src");
    let date = $(element).find("time").text();
    let url = $(element).find(".postArticle-content").parent().attr("href");

    var bulk = db.scrapedData.initializeOrderedBulkOp()
    bulk.insert({
      author: author,
      title: title,
      image: image,
      date: date,
      url: url
    })
    bulk.execute(function (err, res) {
      console.log('Done!')
    })
  });
  db.close();
});