const express = require("express");
const fs = require('fs');
const router = express.Router();

const upload = require('../../services/fileUpload').single('image');

const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Room = require("../../models/Room");
const Villa = require("../../models/Villa");
const User = require("../../models/User");

// AWS S3
router.put("/:_id", auth, (req,res)=>{
    upload(req,res,async (err)=>{
        const newImage = ([req.file.location]);
        try {
            const kamar = await Room.findById( req.params._id);

            kamar.images.unshift(newImage);
            const room = await kamar.save();
            await res.json(room);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server errror in posts.js");
        }

    })
});

//@route POST api/posts
//@desc Create a post
//@access Private
router.post(
    "/",
    [
        auth,
        [
            check("roomName", "Room Name is required!")
                .not()
                .isEmpty(),
            check("description", "Description is required")
                .not()
                .isEmpty(),
            check("harga", "Harga is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        //check error validasi
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {
            roomName,
            description,
            limit,
            harga,
            tipeKamar
        } = req.body;
        try {
            const user = await User.findById(req.user.id).select("-password")

            const newRoom = new Room({
                user: req.user.id,
                name: user.name,
                roomName: roomName,
                description:description,
                limit:limit,
                harga: harga,
                tipeKamar: tipeKamar
            });

            const room = await newRoom.save();
            await res.json(room);
        } catch (err) {
            console.error(err.message)
            res.status(500).send("Server errror in posts.js")
        }
    }
);
//@route GET api/Rooms
//@desc Get all Rooms
//@access public
router.get("/",  async (req, res) => {
    try {
        const room = await Room.find().sort({ date: -1 });
        await res.json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server errror in posts.js");
    }
});


//@route GET api/Room/:id
//@desc Get a single Room
//@access Public
router.get("/:_id", auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params._id);


        if (!room) {
            return res.status(404).json({ msg: "Room not found" });
        }

        await res.json(room);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Room not found" });
        }
        res.status(500).send("Server errror in posts.js2");
    }
});

//@Route    GET api/Room/me
//@desc     GET Current Room
//@access   Private
router.get('/villa/me', auth, async(req,res)=>{
    try{
        const room = await Room.find({user: req.user.id}).populate("users",["name"]);

        if (!room){
            return res.status(400).json({message: "No Villa Profile for this user"});
        }
        await res.json(room);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error! in Villa");
    }
});

//@Route    GET api/room/me
//@desc     GET Current Room
//@access   Public
router.get(
    '/villa/:id',
    async (req,res)=>{
        try {
            const room = await Room.findOne({user: req.params.id}).populate("users", ["name"]);

            if (!room) {
                return res.status(404).json({ msg: "Room not found" });
            }

            await res.json(room);
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res.status(404).json({ msg: "Post not found" });
            }
            res.status(500).send("Server errror in posts.js");
        }
    });



//@route DELETE api/Room/:id
//@desc Delete a single room
//@access Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        const array = room.images;
        const arr = array[0].slice(8,200);
        fs.unlinkSync(`uploads/${arr}`)


        if (!room) {
            return res.status(404).json({ msg: "Post not found" });
        }

        //Make sure user is deleting his own posts
        if (room.user.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ msg: "User not authorized to delete this post" });
        }

        await room.remove();

        await res.json({ msg: "Post was removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server error Router Delete");
    }
});


//@route PUT api/posts/like/:id
//@desc PUT a like on a single post
//@access Private
router.put("/wishlist/:id", auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        //Check if post has already been liked by user
        if (
            room.wishList.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({ msg: "Already liked by this user" });
        }
        //puts it on the beginning
        room.wishList.unshift({ user: req.user.id });
        await room.save();

        res.json(room.wishList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in likes posts.js");
    }
});



//@route PUT api/posts/like/:id
//@desc Remove a like on a post
//@access Private
router.put("/unwishlist/:id", auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        //Check if post has already been liked by user
        if (
            room.wishList.filter(wish => wish.user.toString() === req.user.id).length ===
            0
        ) {
            return res.status(400).json({ msg: "Post hasn't been liked yet!" });
        }
        //puts it on the beginning

        //Get remove index
        const removeIndex = room.wishList
            .map(wish => wish.user.toString())
            .indexOf(req.user.id);

        room.wishList.splice(removeIndex, 1);

        await room.save();

        res.json(room.wishList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error in likes posts.js");
    }
});


module.exports = router;
