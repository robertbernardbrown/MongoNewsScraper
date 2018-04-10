const express       = require("express");
const router        = express.Router();
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
  //go into db and clear non-saved articles
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

function saveArticle(req, res) {
  //go into db and clear non-saved articles
  let id = req.params.id;
  let query = { _id: id };
  db.Article.findByIdAndUpdate(id, { saved: true }, function(){
    console.log("success");
  });
  res.redirect("/");
}

function unsaveArticle(req, res) {
  //go into db and clear non-saved articles
  let id = req.params.id;
  let query = { _id: id };
  db.Article.findByIdAndUpdate(id, { saved: false }, function(){
    console.log("success");
  });
  res.redirect("/saved");
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
          .then(function(){
            res.redirect("/");
          })
          .catch(e=>{
            console.log(e)
          });
        })
    });
}

function clearSaved(req, res){
  db.Note.remove({});
  db.Article.remove()
  .where('saved').equals('true')
  .then(function (data) {
    res.redirect("/saved");
  })
  .catch(e => {
    res.render("saved", e);
  });
}

function articleNotesGet(req, res){
  let id = req.params.id;
  console.log(id);
  db.Article.findById({_id:id})
  .populate("note")
  .then(data=>{
    res.send(data);
  })
};

function notePost(req, res){
  let id = req.params.id;
  let note = {
    note: req.body.note
  }
  console.log(note);
  db.Note.create(note)
  .then(function(dbNote) {
    return db.Article.findOneAndUpdate({_id:id}, { $push: { note: dbNote._id } }, { new: true });
  })
  .then(function(data) {
    console.log(data);
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
};

function noteDelete (req, res){
  let id = req.params.id;
  db.Note.findByIdAndRemove(id)
  .then(function(deleted) {
    res.redirect("saved");
  })
  .catch(function(err) {
    res.json(err);
  });
};

//////////
//ROUTES//
//////////
router.get("/", indexRender);
router.get("/saved", fetchSavedData);
router.get("/clear", clearData);
router.get("/api/fetch", fetchData);
router.get("/api/save/:id", saveArticle);
router.get("/api/unsave/:id", unsaveArticle);
router.get("/api/notes/:id", articleNotesGet);
router.post("/api/notes/:id", notePost);
router.delete("/api/notes/clear/:id", noteDelete);
router.get("/api/clear/saved", clearSaved);

module.exports = router;