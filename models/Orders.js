const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Option to not delete posts, this is why we're using this
const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    room:{
        type: Schema.Types.ObjectId,
        ref: "rooms"
    },
    qty:{
        type:Number
    },
    name:{
        type:String
    },
    subTotal:{
        type: Number
    },
    total:{
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model("order", OrderSchema);
