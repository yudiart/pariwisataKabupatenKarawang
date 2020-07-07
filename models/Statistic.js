const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create reference to user model, associated with _id in database
const StatisticSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    IPv4:{
        type: String
    },
    country_code:{
        type: String
    },
    country_name: {
        type: String
    },
    city: {
        type: String
    },
    latitude: {
        type: Number
    },
    state: {
        type: String
    },
    longitude: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Statistic = mongoose.model("statistic", StatisticSchema);
