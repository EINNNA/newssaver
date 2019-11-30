var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SavedSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

var Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;