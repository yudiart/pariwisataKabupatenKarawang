const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      //Had to be added for profile.js in routes/api/ to remove deprecation warning
      useFindAndModify: false
    });

    console.log("DB connected");
  } catch (err) {
    console.error(err.message);
    //Exit when process fails
    process.exit(1);
  }
};

module.exports = connectDB;
