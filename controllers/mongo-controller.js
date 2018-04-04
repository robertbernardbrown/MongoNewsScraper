const express = require("express");
const router  = express.Router();

///////////////////
//ROUTE FUNCTIONS//
///////////////////
function indexRender (req, res) {
  res.render("index");
}

//////////
//ROUTES//
//////////
router.get("/", indexRender);

module.exports = router;