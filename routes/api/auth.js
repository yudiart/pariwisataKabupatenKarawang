const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const {signup,login,loadUser,getAllUsers} = require("../../controllers/auth");

router.get("/", auth,loadUser);
router.get("/all", getAllUsers);
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password with six or more characters").exists()
  ],login);

router.post("/register",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a password with six or more characters").isLength({min: 6})
    ],signup);
module.exports = router;
