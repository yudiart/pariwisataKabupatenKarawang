const express = require("express");
const fs = require('fs');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Room = require("../../models/Room");
const Villa = require("../../models/Villa");
const User = require("../../models/User");


const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb, res)=>{
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg'){
            return cb(res.status(400).send('only jpg, png are allowed'),false);
        }

    }
});
const upload = multer({storage: storage}).single('file');

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
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            roomName,
            description,
            limit,
            images,
            harga,
            tipeKamar
        } = req.body;
        try {
            const user = await User.findById(req.user.id).select("-password");

            const newRoom = new Room({
                user: req.user.id,
                name: user.name,
                roomName: roomName,
                description:description,
                limit:limit,
                images:images,
                harga: harga,
                tipeKamar: tipeKamar
            });

            const room = await newRoom.save();
            await res.json(room);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server errror in posts.js");
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
router.get("/:id", auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);


        if (!room) {
            return res.status(404).json({ msg: "Post not found" });
        }

        await res.json(room);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
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
