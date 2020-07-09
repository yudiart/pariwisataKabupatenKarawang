const express = require("express");
const fs = require('fs');
const router = express.Router();
const upload = require('../../services/fileUpload').single('image');
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const {Role} = require('../../middleware/authRole');
const fileUpload =require('express-fileupload')
const role ={
    admin: 'admin',
    villa: 'villa',
    customer: 'customer'
}
const Room = require("../../models/Room");
const Villa = require("../../models/Villa");
const User = require("../../models/User");

// AWS S3
router.post("/upload", auth,Role(role.villa), (req,res)=>{
    const errors = validationResult(req);
    //check error va.lidasi
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    upload(req,res,async (err)=>{
        const newImage = ({
            url:req.file.location,
            name:req.file.key
        });
        const newRoom = new Room({
            user: req.user.id,
            images: newImage
        });
        const room = await newRoom.save();
        await res.json(room);
            console.log(newImage)
    })
});
//Upload File in local Storage
// router.post('/uploadImage',auth,async (req,res)=>{
//     if (req.files < 0){
//         return res.status(500).json({msg: 'No file uploaded'})
//     }
//     try {
//         console.log(req.files[0])
//         // console.log(req.files.images)
//         const file = req.files.images
//         const name = file.name
//         console.log(__dirname)
//         await req.files.images.mv(`${__dirname}/../../client/public/uploads/${Date.now()}_${file.name}`,
//             err =>{
//                 if (err){
//                     console.error(err)
//                     return res.status(500).send(err)
//                 }
//             })
//         res.json({fileName: `${Date.now()}_${file.name}`, filePath: `/uploads/${Date.now()}_${file.name}`})
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server errror in posts.js")
//     }
// })


//@route POST api/Room
//@desc Added Room
//@access Private
router.put("/:_id", auth,Role(role.villa), async (req, res) => {
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
    const roomFields = {};
    roomFields.user = req.user.id;
    //Build fasilitas
    roomFields.fasilitas={};
    if (ac)             roomFields.fasilitas.ac = ac;
    if (tv)             roomFields.fasilitas.tv = tv;
    if (bedtype)        roomFields.fasilitas.bedtype = bedtype;
    if (wifi)           roomFields.fasilitas.wifi = wifi;
    if (other)          roomFields.fasilitas.other = other;
    console.log(roomName)
    console.log(description)
    console.log(limit)
    console.log(harga)
    console.log(tipeKamar)
    console.log(roomFields.fasilitas)
    try {
        let kamar = await Room.findById( req.params._id);
        const dataUpdate =({
            roomName: roomName,
            description:description,
            limit:limit,
            harga:harga,
            tipeKamar:tipeKamar,
            fasilitas:roomFields.fasilitas
        })
        if(kamar){
            kamar = await Room.findOneAndUpdate(
                {_id: req.params._id},
                {$set: dataUpdate},
                {new: true}
            );
            return res.json(kamar);
        }
        kamar = new Room(dataUpdate);
        await kamar.save();
        await res.json(kamar);

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server errror in posts.js")
    }
});


//@route POST api/Room
//@desc Update Room By Id
//@access Private
router.post(
    "/:id_kamar",
    [
        auth,Role(role.villa),
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
            tipeKamar,
            ac,
            tv,
            bedtype,
            wifi,
            other
        } = req.body;

        const roomFields = {};
        roomFields.user = req.user.id;
        if (roomName)       roomFields.roomName = roomName;
        if (description)    roomFields.description = description;
        if (limit)          roomFields.limit = limit;
        if (harga)          roomFields.harga = harga;
        if (tipeKamar)      roomFields.tipeKamar = tipeKamar;
        //Build fasilitas
        roomFields.fasilitas={};
        if (ac)             roomFields.fasilitas.ac = ac;
        if (tv)             roomFields.fasilitas.tv = tv;
        if (bedtype)        roomFields.fasilitas.bedtype = bedtype;
        if (wifi)           roomFields.fasilitas.wifi = wifi;
        if (other)          roomFields.fasilitas.other = other;


        try {
            let room = await Room.findOne({ user: req.user.id });
            //Look for profile by user
            if (room) {
                //update!
                room = await Room.findOneAndUpdate(
                    { _id: req.params.id_kamar },
                    { $set: roomFields },
                    { new: true }
                );
                return res.json(room);
            }

            //Create
            room = new Room(roomFields);
            await room.save();
            res.json(room);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error in Profile.js");
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
router.get("/:_id", async (req, res) => {
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

//@Route    GET api/Room/villa/me
//@desc     GET All Rooms By User id
//@access   Private
router.get('/villa/me', auth,Role(role.villa), async(req,res)=>{
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


//@Route    GET api/room/villa/id
//@desc     GET All Room By User id
//@access   Public
router.get(
    '/villa/:id',
    async (req,res)=>{
        try {
            const room = await Room.find({user: req.params.id}).populate("users", ["name"]);

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
router.delete("/:id", auth,Role(role.villa), async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
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

        await res.json({ msg: `${room.roomName} has been deleted!` });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Room not found" });
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
            return res.status(400).json({ msg: "Room hasn't been wishlist yet!" });
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
        res.status(500).send("Server error in wishlist Room.js");
    }
});


module.exports = router;
