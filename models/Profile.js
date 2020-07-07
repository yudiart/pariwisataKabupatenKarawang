const mongoose = require("mongoose");

//Create reference to user model, associated with _id in database
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  fullname:{
    type: String
  },
  contact:{
    type: Number
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
