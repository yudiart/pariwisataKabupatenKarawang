const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Option to not delete posts, this is why we're using this
const WisataSchema = new Schema({
    name: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    lokasi:{
        type:String
    },
    status:{
        type: String
    },
    harga:{
        type:Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Wisata = mongoose.model("wisata", WisataSchema);
