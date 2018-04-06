const express = require("express");
const router  = express.Router();
const scrapeData = require("./scrape");

///////////////////
//ROUTE FUNCTIONS//
///////////////////
function indexRender (req, res) {
  res.render("index");
}
function fetchData (req, res) {
  var url = "https://hackernoon.com/tagged/software-development";
  scrapeData(url);
}

//////////
//ROUTES//
//////////
router.get("/", indexRender);
router.get("/api/fetch", fetchData);

module.exports = router;