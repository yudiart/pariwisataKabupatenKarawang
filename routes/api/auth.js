const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const {signup,login,loadUser} = require("../../controllers/auth");

// @route    GET api/auth
// @desc     Load User
// @access   Public
router.get("/", auth,loadUser);

//@route POST api/auth
//@desc Authenticate user, retrieves token as well
//@access Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).exists()
  ],login);

router.post("/register",
    [
      check("email", "Please enter a valid email").isEmail(),
      check(
          "password",
          "Please enter a password with six or more characters"
      ).isLength({
        min: 6
      })
    ],signup);
module.exports = router;
