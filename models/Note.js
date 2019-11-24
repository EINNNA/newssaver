var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    name: {
        type: String,
        maxlength: 200
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Article"
        }
    ]
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;