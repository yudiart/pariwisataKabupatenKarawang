const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Option to not delete posts, this is why we're using this
const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    order:{
        type: Schema.Types.ObjectId,
        ref: "orders"
    },
    code_payment:{
        type:String
    },
    status:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Payment = mongoose.model("payment", OrderSchema);
