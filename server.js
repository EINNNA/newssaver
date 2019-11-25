var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
//var exhb = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

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
    axios.get("https://www.nationalgeographic.com.au/news/animals.aspx").then(function (response) {
        var $ = cheerio.load(response.data);
        $("div.Container").each(function (i, element, link) {
            var result = {};

            result.title = $(this).children("div.Padding").children("a").text();
            result.body = $(this).children("div.Padding").children("p.Description").text();
            result.link = $(this).children("div.Padding").children("a").attr("href");

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

app.get("/articles/", function(req, res){
    db.Article.find({}).then( function(dbArticle){
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    })
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
});

app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
});

/*app.get("/articles/:id", function(req, res){
    db.Article.findOne({ _id: req.params.id })
        .populate("saved")
        .then(function(dbSaved) {
        res.json(dbSaved);
    });
});*/

app.get("/saved/", function(req, res){
    db.Saved.find({}).then( function(dbSaved){
        res.json(dbSaved);
    }).catch(function(err){
        res.json(err);
    });
});

app.post("/saved/:id", function(req, res){
    db.Saved.create({ _id: req.params.id }).then(function(dbSaved) {
        res.json(dbSaved);
    });
});

app.delete("/saved/delete/", function(req, res){
    db.Saved.remove({}).then(function(dbSaved) {
        res.json(dbSaved);
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});