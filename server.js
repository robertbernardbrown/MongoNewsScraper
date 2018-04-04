const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");

const app = express();
const port = process.env.PORT || 3000;

//LOAD MIDDLEWARE (BODYPARSER / EXPRESS STATIC DIRECTORY)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")));

const expHbs = require("express-handlebars");
app.engine("handlebars", expHbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require("./controllers/mongo-controller");
app.use(routes);

app.listen(port, ()=> {
  console.log("App is running on port " + port);
});

module.exports = app;