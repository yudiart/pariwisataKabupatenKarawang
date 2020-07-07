const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Cart = require("../models/Carts");
const Villa = require("../models/Villa");
const Room = require("../models/Room");

exports.getProfileMe = async (req, res) => {
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