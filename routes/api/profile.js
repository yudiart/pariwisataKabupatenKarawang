const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Cart = require("../../models/Carts");
const Villa = require("../../models/Villa");
const Room = require("../../models/Room");
const {ProfileMe,createProfile} = require("../../controllers/users");

//@route GET api/profile/me
//@desc Get current user
//@access Private
router.get("/me", auth, ProfileMe);

//@route Post api/profile
//@desc Create or update user profile
//@access Private
router.post("/",
    [auth,
      [
          check("fullname", "Name is required").not().isEmpty(),
          check("contact", "contact is required").not().isEmpty(),
          check("location", "location is required").not().isEmpty(),
          check("bio", "Bio is required").not().isEmpty()

      ]
    ], createProfile);

//@route Get api/profile
//@desc Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

//@route Get api/profile/user/user_id
//@desc Get user profile by id
//@access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).json({ message: "Profile not found!" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Profile not found!" });
    }
    res.status(500).send("Server error in profile.js");
  }
});

//@route DELETE api/profile
//@desc Remove a profile, user, and posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    //Remove user's posts
    if (req.user.role === 'customer'){
      await Cart.deleteMany({ user: req.user.id });
      await Profile.findOneAndRemove({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });
    }

    if (req.user.role === 'villa'){
      await Villa.deleteMany({ user: req.user.id });
      await Profile.findOneAndRemove({ user: req.user.id });
      await Room.findOneAndRemove({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });
    }
    res.json({ msg: `User ${user.email} Has been Deleted!` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

//@route PUT api/profile/experience
//@desc Add profile experience
//@access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required!")
        .not()
        .isEmpty(),
      check("company", "Company is required!")
        .not()
        .isEmpty(),
      check("from", "From date is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructring
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //Push
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error in profile.js");
    }
  }
);

//@route DELETE api/profile/experience/:exp_id
//@desc Remove a profile experience
//@access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    //Get profile by user id
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

//

//@route PUT api/profile/education
//@desc Add profile education
//@access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required!")
        .not()
        .isEmpty(),
      check("degree", "Degree is required!")
        .not()
        .isEmpty(),
      check("from", "From date is required!")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructring
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //Push
      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error in profile.js");
    }
  }
);

//@route DELETE api/profile/education/:edu_id
//@desc Remove a profile education
//@access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    //Get profile by user id
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

//@route GET api/profile/github/:username
//@desc Get github user
//@access Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res
          .status(400)
          .json({ msg: "No github profile found, uri broken probs" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

module.exports = router;
