const express = require("express");
const router = express.Router();
const scrapeData = require("./scrape");
const displayData = require("./display");
var mongoose = require("mongoose");
var db = require("../models");
var databaseUrl = "mongodb://localhost:27017/scrape";
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

function fetchData(req, res) {
  var url = "https://hackernoon.com/tagged/software-development";
  scrapeData(url);
  // res.json(data);
}

//////////
//ROUTES//
//////////
router.get("/", indexRender);
router.get("/api/fetch", fetchData);
router.get("/saved", fetchSavedData);
router.get("/clear", fetchData);


module.exports = router;