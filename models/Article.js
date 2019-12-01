var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    body: String,
    link: String,
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: { 
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;