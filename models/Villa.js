const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VillaSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
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
    kamar: [
        {
            villa: {
                type: Schema.Types.ObjectId,
                ref: "villas"
            },
            roomName: {
                type: String
            },
            description: {
                type: String
            },
            image: {
                type: String
            },
            limit:{
                type: Number
            },
            fasilitas: {
                kasur:{
                    type: String
                },
                ac:{
                    type: String
                },
                tv:{
                    type: String
                }
            },
            harga:{
                type: Number,
                maxLength: 30,
                default: 0
            },
            wishList:[
                {
                    user:{
                        type:Schema.Types.ObjectId,
                        ref: 'users'
                    }
                }
            ],
            tipeKamar:{
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    follow: [
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