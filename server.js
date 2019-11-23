var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
//var exhb = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;
var app = express();

//app.engine('handlebars', exhb());
//app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newssaver", { useNewUrlParser: true });

//app.get("/", function(req, res){
//    res.render("index");
//});

app.get("/scrape", function (req, res) {
    axios.get("https://old.reddit.com/r/Cooking/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("div._1poyrkZ7g36PawDueRza-J _11R7M_VOgKO1RJyRSRErT3").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("div")
                .hasClass("y8HYJ-y_lTUHkQIc1mdCq _2INHSNB8V5eaWp4P0rY_mE");
            result.body = $(this)
                .children("div")
                .hasClass("_292iotee39Lmt0MkQZ2hPV RichTextJSON-root");

            db.Post.create(result)
                .then(function (dbPost) {
                    console.log(dbPost);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});