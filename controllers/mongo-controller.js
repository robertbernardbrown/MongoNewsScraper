const express     = require("express");
const router      = express.Router();
const cheerio       = require("cheerio");
const request       = require("request");
// const scrapeData  = require("./scrape");
// const displayData = require("./display");
const mongoose      = require("mongoose");
const db            = require("../models");
const databaseUrl   = "mongodb://localhost:27017/scrape";
mongoose.connect(databaseUrl);
mongoose.connection.on('error', function (err) {
  console.error('connection error: ' + err);
});

///////////////////
//ROUTE FUNCTIONS//
///////////////////
function indexRender(req, res) {
  //go into db and fetch articles
  db.Article.find({})
    .where('saved').equals('false')
    .then(function (data) {
      let articleObj = {
        article: data
      };
      res.render("index", articleObj);
    })
    .catch(e => {
      res.render("index", e);
    });
}

function fetchSavedData(req, res) {
  //go into db and fetch saved articles
  db.Article.find({})
    .where('saved').equals('true')
    .then(function (data) {
      let articleObj = {
        article: data
      };
      res.render("saved", articleObj);
    })
    .catch(e => {
      res.render("saved", e);
    });
}

function clearData(req, res) {
  //go into db and fetch saved articles
  db.Article.remove()
    .where('saved').equals('false')
    .then(function (data) {
      // let articleObj = {
      //   article: data
      // };
      res.redirect("/");
    })
    .catch(e => {
      res.render("index", e);
    });
}

function fetchData(req, res) {
  var url = "https://hackernoon.com/tagged/software-development";
    request(url, (error, response, html)=>{
      if (error) throw error;
      var $ = cheerio.load(html);
        // mongoose.connection.db.dropCollection("articles");
        $(".postArticle").each(function (i, element) {
          let item = {
            author: $(element).find("[data-user-id]").text(),
            title: $(element).find(".graf--title").text(),
            image: $(element).find("div.aspectRatioPlaceholder").children().next().attr("src"),
            published: $(element).find("time").text(),
            url: $(element).find(".postArticle-content").parent().attr("href")
          }
          db.Article.create(item)
          .catch(e=>{
            console.log(e)
          });
          console.log("done" + i);
        })
    });
  res.redirect("/");
}

//////////
//ROUTES//
//////////
router.get("/", indexRender);
router.get("/api/fetch", fetchData);
router.get("/saved", fetchSavedData);
router.get("/clear", clearData);


module.exports = router;