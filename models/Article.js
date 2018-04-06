var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
    author: {
      type: String
    },
    title: {
      type: String
    },
    image: {
      type: String
    },
    date: {
      type: String
    },
    url: {
      type: String,
      unique: true
    },
  })

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;