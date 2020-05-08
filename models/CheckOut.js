const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Option to not delete posts, this is why we're using this
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "rooms"
    },
    name: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model("check_out", PostSchema);
