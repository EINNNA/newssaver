var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newssaver", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    axios.get("https://www.nationalgeographic.com.au/news/animals.aspx").then(function (response) {
        var $ = cheerio.load(response.data);
        $("div.Padding").each(function (i, element) {
            var result = {};

            result.title = $(this).children("a").text();
            result.body = $(this).children("div.Description").text();
            result.link = $(this).children("a").attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
        console.log(response.data);
    });
});

//PULLING PAGE DATA
app.get("/articles/", function(req, res){
    db.Article.find({})
    .populate("note")
    .then( function(dbArticle){
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    })
});

//PUTTING IDS ON THINGS
app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
});

//ADDING NOTES
app.post("/articlenotes/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate(
                { _id: req.params.id },
                { note: dbNote._id },
                { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
});


//DELETING NOTES
app.delete("/notes/:id", function(req, res){
    db.Note.remove({ _id: req.params.id })
    .then(function(err) {
        throw err;
    }).catch(function(dbArticle) {
        res.json(dbArticle);
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});