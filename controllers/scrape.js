var cheerio = require("cheerio");
var request = require("request");

request("https://hackernoon.com/tagged/software-development", function(error, response, html) {
  var $ = cheerio.load(html);
  var results = [];
  $("h3.graf--title").each(function(i, element) {
    var title = $(element).text();
    results.push({
      title: title
    });
  });
  console.log(results);
});