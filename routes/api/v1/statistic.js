const auth = require("../../../middleware/auth");

const { check, validationResult } = require("express-validator");
const fetch = require('node-fetch')
const express = require("express");
const router = express.Router();
const User = require("../../../models/User");
const Statistic = require("../../../models/Statistic");
router.get('/',async (req,res)=>{
    let API_KEY = '697de680-a737-11ea-9820-af05f4014d91';
    let geo = await fetch(`https://geolocation-db.com/json/${API_KEY}`)
        .then(response=>response.json())
    await res.json(geo)
})
router.post('/',async (req,res)=>{
    try{
        const user = User.findById({user:req.user.id})
        let API_KEY = '697de680-a737-11ea-9820-af05f4014d91';
        let geo = await fetch(`https://geolocation-db.com/json/${API_KEY}`)
            .then(response=>response.json())
        const newStat = new Statistic({
            // user: req.user.id,
            country_code:geo.country_code,
            country_name:geo.country_name,
            city:geo.city,
            latitude:geo.latitude,
            longitude:geo.longitude,
            IPv4:geo.IPv4,
            state:geo.state
        })
        const statis = await newStat.save()
        await res.status(200).json(statis)

    }catch (err) {
        console.error(err.message)
        await res.status(500).send("Server error in API geolocation-db.com")
    }
})
module.exports = router;
