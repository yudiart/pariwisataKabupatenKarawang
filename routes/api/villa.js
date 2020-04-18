const express = require("express");
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Villa = require("../../models/Villa");


//@Route    GET api/villa/me
//@desc     GET Current Villa
//@access   Private
router.get('/me', auth, async(req,res)=>{
    try{
        const villa = await Villa.findOne({user: req.user.id}).populate(
            "villa",["name","avatar"]
        );

        if (!villa){
            return res.status(400).json({message: "No Villa Profile for this user"});
        }
        await res.json(villa);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error! in Villa");
    }
});


//@route Post api/villa
//@desc Create or update villa
//@access Private
router.post(
    "/",
    [
        auth,
        [
            check("contact", "Contact is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        //check for errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Pull everything out from the body
        const {
            kecamatan,
            kelurahan,
            postcode,
            jalan,
            kampung,
            blok,
            rt,
            rw,
            no,
            bio,
            contact,
            youtube,
            facebook,
            twitter,
            instagram,
        } = req.body;

        //Build profile object to insert into database
        const villaFields = {};
        villaFields.user = req.user.id;
        if (bio) villaFields.bio = bio;
        if (contact) villaFields.contact = contact;

        //Build location
        villaFields.location={};
        if (kecamatan) villaFields.location.kecamatan = kecamatan;
        if (kelurahan) villaFields.location.kelurahan = kelurahan;
        if (postcode) villaFields.location.postcode = postcode;
        if (jalan) villaFields.location.jalan = jalan;
        if (kampung) villaFields.location.kampung = kampung;
        if (blok) villaFields.location.blok = blok;
        if (rt) villaFields.location.rt = rt;
        if (rw) villaFields.location.rw = rw;
        if (no) villaFields.location.no = no;


        //Build social object to insert into database
        villaFields.social = {};
        if (youtube) villaFields.social.youtube = youtube;
        if (twitter) villaFields.social.twitter = twitter;
        if (facebook) villaFields.social.facebook = facebook;
        if (instagram) villaFields.social.instagram = instagram;

        try {
            let villa = await Villa.findOne({ user: req.user.id });
            //Look for profile by user
            if (villa) {
                //update!
                villa = await Villa.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: villaFields },
                    { new: true }
                );

                return res.json(villa);
            }

            //Create
            villa = new Villa(villaFields);
            await villa.save();
            await res.json(villa);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error in Profile.js");
        }
    }
);


//@route Get api/villa
//@desc Get all Villas
//@access Public
router.get("/", async (req, res) => {
    try {
        const villa = await Villa.find().populate("villa", ["name", "avatar"]);
        res.json(villa);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in profile.js");
    }
});

//@route Get api/villa/profile/villa_id
//@desc Get user profile by id
//@access Public
router.get("/profile/:villa_id", async (req, res) => {
    try {
        const villa = await Villa.findOne({
            user: req.params.villa_id
        }).populate("villa", ["name", "avatar"]);
        if (!villa)
            return res.status(400).json({ message: "Villa not found!" });
        await res.json(villa);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(400).json({ message: "Villa not found!" });
        }
        res.status(500).send("Server error in profile.js");
    }
});

//@route DELETE api/profile
//@desc Remove a profile, user, and posts
//@access Private
router.delete("/", auth, async (req, res) => {
    try {
        //Remove user's posts

        // await Post.deleteMany({ user: req.user.id });

        //Removes the profile
        await Villa.findOneAndRemove({ user: req.user.id });
        //Removes user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in profile.js");
    }
});



//@route PUT api/Villa/Kamar
//@desc Add Villa Kamar
//@access Private
router.put(
    "/kamar",
    [
        auth,
        [
            check("roomName", "roomName is required!")
                .not()
                .isEmpty(),
            check("description", "description is required!")
                .not()
                .isEmpty(),
            check("harga", "harga date is required!")
                .not()
                .isEmpty(),
            check("limit", "limit is required!")
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
            roomName,
            description,
            image,
            limit,
            harga,
            tipeKamar,
            fasilitas
        } = req.body;
        const newKam = {
            roomName,
            description,
            image,
            limit,
            harga,
            tipeKamar,
            fasilitas
        };

        try {
            const villa = await Villa.findOne({ user: req.user.id });
            //Push
            villa.kamar.unshift(newKam);

            await villa.save();

            res.json(villa);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error in profile.js");
        }

    }
);

//@route DELETE api/villa/kamar/:kamar_id
//@desc Remove a Kamar Villa
//@access Private
router.delete("/kamar/:kamar_id", auth, async (req, res) => {
    try {
        //Get profile by user id
        const villa = await Villa.findOne({ user: req.user.id });

        //Get remove index
        const removeIndex = villa.kamar
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        villa.kamar.splice(removeIndex, 1);

        await villa.save();

        res.json(villa);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in profile.js");
    }
});

module.exports = router;
