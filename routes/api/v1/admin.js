const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const User = require("../../../models/User");
const Room = require("../../../models/Room");
//@route GET api/auth/all
//@desc Auth user by role admin.
//access private by role admin
router.get('/users',auth,async (req,res)=>{
    try{
        const admin = await User.findById(req.user.id).select('-password');
        const users = await User.find();
        if (admin.role === 'admin'){
            const result = users.filter(r => r.role === 'villa' || r.role ==='customer');
            await res.json(result);
        }else{
            res.status(500).send('Tidak Bisa di Akses');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route GET api/auth/customers
//@desc Auth user by role admin.
//access private by role admin
router.get('/customers',auth,async (req,res)=>{
    try{
        const admin = await User.findById(req.user.id).select('-password');
        const users = await User.find();
        if (admin.role === 'admin'){
            const result = users.filter(r => r.role === 'customer');
            await res.json(result);
        }else{
            res.status(500).send('Tidak Bisa di Akses');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route GET api/auth/Villas
//@desc Auth user by role admin.
//access private by role admin
router.get('/villas',auth,async (req,res)=>{
    try{
        const admin = await User.findById(req.user.id).select('-password');
        const users = await User.find();
        if (admin.role === 'admin'){
            const result = users.filter(r => r.role === 'villa');
            await res.json(result);
        }else{
            res.status(500).send('Tidak Bisa di Akses');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route GET api/v1/admin/rooms
//@desc Auth user by role admin.
//access private by role admin
router.get('/rooms',auth,async (req,res)=>{
    try{
        const admin = await User.findById(req.user.id).select('-password');
        const rooms = await Room.find();
        if (admin.role === 'admin'){
            await res.json(rooms);
        }else{
            res.status(500).send('Tidak Bisa di Akses');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




module.exports = router;
