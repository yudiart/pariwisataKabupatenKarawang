const express = require("express");
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const {Role} = require('../../middleware/authRole');

const role ={
    admin: 'admin',
    villa: 'villa',
    customer: 'customer'
}
const User = require("../../models/User");
const Villa = require("../../models/Villa");


//@Route    GET api/villa/me
//@desc     GET Current Villa
//@access   Private
router.get('/me', auth, async(req,res)=>{
    try{
        const villa = await Villa.findOne({user: req.user.id}).populate(
            "villa",["name"]
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
        auth,Role(role.villa),
        [
            check("villaName", "Status is required")
                .not()
                .isEmpty(),
            check("kecamatan", "Status is required")
                .not()
                .isEmpty(),
            check("contact", "Status is required")
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
            villaName,
            kecamatan, kelurahan, postcode, jalan, kampung, blok, rt, rw, no,
            contact,
            bio,
            youtube, facebook, twitter, instagram,
        } = req.body;

        //Build profile object to insert into database
        const villaFields = {};
        villaFields.user = req.user.id;
        if (villaName)  villaFields.villaName = villaName;
        if (bio)        villaFields.bio = bio;
        if (contact)    villaFields.contact = contact;

        //Build address
        villaFields.location={};
        if (kecamatan)  villaFields.location.kecamatan = kecamatan;
        if (kelurahan)  villaFields.location.kelurahan = kelurahan;
        if (postcode)   villaFields.location.postcode = postcode;
        if (jalan)      villaFields.location.jalan = jalan;
        if (kampung)    villaFields.location.kampung = kampung;
        if (blok)       villaFields.location.blok = blok;
        if (rt)         villaFields.location.rt = rt;
        if (rw)         villaFields.location.rw = rw;
        if (no)         villaFields.location.no = no;


        //Build social object to insert into database
        villaFields.social = {};
        if (youtube)    villaFields.social.youtube = youtube;
        if (twitter)    villaFields.social.twitter = twitter;
        if (facebook)   villaFields.social.facebook = facebook;
        if (instagram)  villaFields.social.instagram = instagram;

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
            res.json(villa);

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
        res.status(500).send("Server error in Villa.js");
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
router.post("/uploadImage",auth,(req,res)=>{

    //setelah mendapatkan gambar dari client
    //we need to save it inside Node server

    //Multer Library
    upload(req,res, err =>{
        if(err)return res.json({success:false,err})
        return res.json({
            success: true,
            image: res.req.file.path,
            fileName:res.req.file.filename
        })
    });
});


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


router.put("/likes/:id", auth, async (req, res) => {
    try {
        const villa = await Villa.findById(req.params.id);

        //Check if post has already been liked by user
        if (
            villa.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({ msg: "Already liked by this user" });
        }
        //puts it on the beginning
        const nDate = new Date().toLocaleString('in-ID', {
            timeZone: 'Asia/Jakarta'
        });
        villa.likes.unshift({ user: req.user.id,date:nDate });
        await villa.save();

        res.json(villa.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in likes posts.js");
    }
});

router.put("/unlikes/:id", auth, async (req, res) => {
    try {
        const villa = await Villa.findById(req.params.id);

        //Check if post has already been liked by user
        if (
            villa.likes.filter(like => like.user.toString() === req.user.id).length ===
            0
        ) {
            return res.status(400).json({ msg: "Room hasn't been wishlist yet!" });
        }
        //puts it on the beginning

        //Get remove index
        const removeIndex = villa.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

            villa.likes.splice(removeIndex, 1);

        await villa.save();

        res.json(villa.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in wishlist Room.js");
    }
});

router.get('/likes',auth,Role(role.villa), async(req,res)=>{
    try{
        const villa = await Villa.findOne({ user: req.user.id });
        const likees = villa.likes;
        const c = likees.map(item => item.user);
        const b = await User.find({_id:c}).select('_id name avatar date');
        await res.json(b);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error in likes Villa.js | Line 243");
    }
})


router.get('/time',async (req,res)=>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });

    console.log(nDate);
})
module.exports = router;
