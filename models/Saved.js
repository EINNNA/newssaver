var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SavedSchema = new Schema({
    title: String,
    body: String,
    link: String
});

var Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;