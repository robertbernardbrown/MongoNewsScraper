var mocha = require("mocha");
var chai  = require("chai");
var expect = chai.expect;
var scrape = require("../controllers/scrape");
var mongoose    = require("mongoose");
var db          = require("../models");
var databaseUrl = "mongodb://localhost:27017/scrape";
mongoose.connect(databaseUrl);
mongoose.connection.on('error', function (err) {
  console.error('connection error: ' + err);
});

describe("fetchData", function() {
    it("should populate db from hackernoon site", function() {
        // var url = "https://hackernoon.com/tagged/software-development";
        // let request = scrape(url);
        // expect(db.Article.find({})).to.be.an(object);
    });
});