const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Cart = require("../models/Carts");
const Villa = require("../models/Villa");
const Room = require("../models/Room");

exports.ImageUpload = async (req, res) => {
    if (req.files === null){
        return res.status(400).json({msg: 'No file upload'})
    }
    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`,err=>{
        if (err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
}

exports.Me = async (req,res)=>{
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
}

exports.CreateProfile = async (req, res) => {
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
exports.AddRooms = async (req,res)=>{

    const {
        roomName,
        description,
        limit,
        harga,
        tipeKamar,
        ac,
        tv,
        bedtype,
        wifi,
        other
    } = req.body;
    //Build profile object to insert into database
    const villaFields = {};
    villaFields.user = req.user.id;
    villaFields.rooms = [{}];
    if (roomName)       villaFields.rooms.roomName    = roomName;
    if (description)    villaFields.rooms.description = description;
    if (limit)          villaFields.rooms.limit       = limit;
    if (harga)          villaFields.rooms.harga       = harga;
    if (tipeKamar)      villaFields.rooms.tipeKamar   = tipeKamar;


    //Build address
    villaFields.rooms.fasilitas={};
    if (ac)  villaFields.rooms.fasilitas.ac = ac;
    if (tv)  villaFields.rooms.fasilitas.tv = tv;
    if (bedtype)   villaFields.rooms.fasilitas.bedtype = bedtype;
    if (wifi)      villaFields.rooms.fasilitas.wifi = wifi;
    if (other)    villaFields.rooms.fasilitas.other = other;

    try {
        let villa = await Villa.findOne({ user: req.user.id });
        if (villa) {
            //update!
            villa = await Villa.insertMany({rooms:villaFields});
            return res.json(villa);
        }
        // villa = new Villa(villaFields);
        await villa.rooms.save();
        res.json(villa);

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server errror in posts.js")
    }
}
exports.PublicMe =  async (req, res) => {
    try {
        const villa = await Villa.find().sort({ date: -1 });
        await res.json(villa);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in profile.js");
    }
}
exports.ProfileMe = async (req, res) => {
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
}

exports.DeleteRoom = async (req, res) => {
    try {
        //Get profile by user id
        const villa = await Villa.findOne({ user: req.user.id });

        //Get remove index
        const removeIndex = villa.kamar
            .map(item => item.id)
            .indexOf(req.params.kamar_id);

        villa.kamar.splice(removeIndex, 1);

        await villa.save();

        await res.json(villa);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in profile.js");
    }
}

exports.DeleteAll = async (req, res) => {
    try {
        //Removes the profile
        await Villa.findOneAndRemove({ user: req.user.id });
        await Profile.findOneAndRemove({ user: req.user.id });
        //Removes user
        await User.findOneAndRemove({ _id: req.user.id });
        await res.json({ msg: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in profile.js");
    }
}

exports.LikesVilla =async (req, res) => {
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

        await res.json(villa.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in likes posts.js");
    }
}

exports.UnlikesVilla =async (req, res) => {
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
}

exports.GetLikesVilla = async(req,res)=>{
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
}