const jwt = require("jsonwebtoken");
const config = require("config");
const User = require('../models/User');
module.exports = (req, res, next)=> {
  //Pull token from header
  const token = req.header("x-auth-token");
  //Check if there isn't a token
  if (!token) {
    return res.status(401).json({ message: "No Token" });
  }

  //Verify if there is a token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token isnt valid!" });
  }
};