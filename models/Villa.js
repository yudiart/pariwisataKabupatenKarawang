const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VillaSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    villaName:{
        type: String
    },
    location: {
        kecamatan:{
            type:String
        },
        kelurahan:{
            type:String
        },
        postcode:{
          type: Number
        },
        jalan:{
            type:String
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
        type:Number
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
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            date:{
                type: Date
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Villa = mongoose.model('villa', VillaSchema);