const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  role:{
    type: String,
    enum: ['customer','villa','admin']
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
