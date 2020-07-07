const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Cart = require("../models/Carts");
const Villa = require("../models/Villa");
const Room = require("../models/Room");

exports.createProfile = async (req, res) => {
    const errors = validationResult(req);
    //check for errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Pull everything out from the body
    const {
        fullname,
        contact,
        location,
        bio,
        status,
        youtube,
        facebook,
        twitter,
        instagram,
    } = req.body;

    //Build profile object to insert into database
    const profileFields = {};
    profileFields.user = req.user.id;
    if (fullname) profileFields.fullname = fullname;
    if (contact) profileFields.contact = contact;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;

    //Build social object to insert into database
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        //Look for profile by user
        if (profile) {
            //update!
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        //Create
        profile = new Profile(profileFields);
        await profile.save();
        await res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error in Profile.js");
    }
}

exports.ProfileMe = async (req, res) => {
    try {
        //Profile model, pertains to the database id!
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ message: "No profile for this user" });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error! In profile");
    }
}