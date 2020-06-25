const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ['customer','villa']
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmed:{
    type: Boolean,
    default: false
  },
  resetLink:{
    type:String,
    default:''
  },
  isAdmin:{
    type: Boolean,
    default:false
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
