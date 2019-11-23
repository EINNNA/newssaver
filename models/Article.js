var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    body: String
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;