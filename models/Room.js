const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Option to not delete posts, this is why we're using this
const RoomSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    roomName: {
        type: String
    },
    description: {
        type: String
    },
    images: {
        type: Array,
            default: []
    },
    limit: {
        type: Number,
        default: 1
    },
    harga: {
        type: Number
    },
    tipeKamar: {
        type: String
    },
    fasilitas: {
        ac: {
            type: String
        },
        tv: {
            type: String
        },
        bedtype: {
            type: String
        },
        wifi: {
            type: String
        },
        other:{
            type: String
        }
    },
    wishList: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Room = mongoose.model("room", RoomSchema);
