const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VillaSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    villaName:{
        type: String,
        required: true
    },
    location: {
        kecamatan:{
            type:String,
            required: true
        },
        kelurahan:{
            type:String,
            required:true
        },
        postcode:{
          type: Number,
          required: true
        },
        jalan:{
            type:String,
            required: true
        },
        kampung:{
            type:String
        },
        blok:{
            type:String
        },
        rt:{
            type: Number
        },
        rw:{
            type: Number
        },
        no: {
            type: Number
        }

    },
    contact:{
        type:Number,
        required: true
    },
    bio: {
        type: String
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    images: {
        type: Array,
        default: []
    },
    followers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Villa = mongoose.model('villa', VillaSchema);