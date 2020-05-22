const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Option to not delete posts, this is why we're using this
const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    rooms:[
        {
            room:{
                    type: Schema.Types.ObjectId,
                    ref: "rooms"
                }
        }
    ],
    travels:[
        {
            travel:{
                //ini perlu di ganti kalo udah ada database nya
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
