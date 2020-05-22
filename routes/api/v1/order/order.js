const { check, validationResult } = require("express-validator");

const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const User = require("../../../../models/User");
const Villa = require("../../../../models/Villa");
const Room = require("../../../../models/Room");
const Order = require("../../../../models/Orders");
//@route GET api/auth/all
//@desc Auth user by role admin.
//access private by role admin
router.post("/",
    [
        auth,
        [
            check('qty','Qty is required')
                .not()
                .isEmpty(),
            check('room', 'Room not found').not().isEmpty()
        ]
    ],async (req, res) => {
        try {
            const room = await Room.findById(req.body.room);
            if (!room) {
                return res.status(404).json({ msg: "Room not found" });
            }
            const user = await User.findById(req.user.id).select("-password");
            const subtotal = room.harga;
            const total = subtotal * req.body.qty;
            const newOrd = new Order({
                user: user.id,
                room: req.body.room,
                qty: req.body.qty,
                name: user.name,
                subTotal: subtotal,
                total:  total
            });

            const post = await newOrd.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server errror in posts.js");
        }
    }
);
module.exports = router;
