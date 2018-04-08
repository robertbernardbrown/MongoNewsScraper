var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
    author: {
      type: String
    },
    title: {
      type: String,
      unique: true
    },
    image: {
      type: String
    },
    published: {
      type: String
    },
    url: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  })

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;