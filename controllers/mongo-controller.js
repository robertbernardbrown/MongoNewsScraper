const express = require("express");
const router  = express.Router();
const data = require("./scrape");

///////////////////
//ROUTE FUNCTIONS//
///////////////////
function indexRender (req, res) {
  res.render("index");
}
function fetchData (req, res) {
  getData();
}

//////////
//ROUTES//
//////////
router.get("/", indexRender);
router.get("/api/fetch", fetchData);

module.exports = router;