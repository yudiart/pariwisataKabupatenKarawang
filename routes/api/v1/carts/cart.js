const { check, validationResult } = require("express-validator");

const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");
const {Role} = require('../../../../middleware/authRole');
const User = require("../../../../models/User");
const Villa = require("../../../../models/Villa");
const Room = require("../../../../models/Room");
const Order = require("../../../../models/Orders");
const Carts = require("../../../../models/Carts");
const {ROLE} = require("../data");

const role ={
    admin: 'admin',
    villa: 'villa',
    customer: 'customer'
}
//@route GET api/auth/all
//@desc Auth user by role admin.
//access private by role admin
router.put("/",auth,Role(role.customer),async (req, res) => {
    //destructring
    const {
        room,
        travel
    } = req.body;
    const newRoom = {
        room
    };
    const newTrav = {
        travel
    }
    try {
        const carts = await Carts.findOne({ user: req.user.id });
        const rooms =  carts.rooms;
        const trav = carts.travels;
        if(rooms.length < 10 || trav.length < 10){
            if(room && travel){
                carts.rooms.unshift(newRoom)
                carts.travels.unshift(newTrav)
                const cart = await carts.save()
                await res.json(cart)
            }else if(room && !travel){
                carts.rooms.unshift(newRoom)
                const cart = await carts.save()
                await res.json(cart)
            }else if(!room && travel){
                carts.travels.unshift(newTrav)
                const cart = await carts.save()
                await res.json(cart)
            }else{
                return res.status(404).json({ msg: "Cart unknown" });
            }

        }else{
            return res.status(404).json({ msg: "Cart is over limit, fill Cart max 10 items" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server errror in posts.js");
    }
    }
);

router.get("/",auth,Role(ROLE.customer), async (req, res) => {
        try {
            const carts = await Carts.findOne({ user: req.user.id })

            const a =carts.rooms.length;
            const b =carts.travels.length;
            const c = a+b;

            await res.json(carts)
        }catch (err) {
            console.error(err.message);
            res.status(500).send("Server errror in posts.js");
        }
    }
);

router.get('/count', auth,Role(ROLE.customer), async(req,res)=>{
    try {
        const carts = await Carts.findOne({ user: req.user.id })
        const a =carts.rooms.length;
        const b =carts.travels.length;
        const c = a+b;

        await res.json(c)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server errror in posts.js");
    }
})
module.exports = router;
