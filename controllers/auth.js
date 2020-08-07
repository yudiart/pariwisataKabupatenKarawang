const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const User =require ('../models/User');
const Carts =require ('../models/Carts');
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");


//Create User
exports.signup = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password,role,isAdmin} =req.body;
    try{
        let user = await User.findOne({ email })
        if (user) {
            return res
                .status(400)
                .json({ errors: [{ message: "User already exists" }] });

        }
        //Gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            default: "mm"
        });
        //Deklrasi user baru
        user = new User({
            email,
            role,
            isAdmin,
            avatar,
            password
        });

        //salt password, default 10
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //Create payload
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                isAdmin: user.isAdmin
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:'20m'},
            (err, token) => {
                if (err) throw err;
                    res.json({
                        token,
                    })
            }
        )

        if (role === 'customer'){
            const cart = new Carts({user:user.id});
            await cart.save();
        }

    }catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.loadUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        await res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.getAllUsers = async (req,res)=>{
    try {
        const users = await User.find().sort({ date: -1 });
        const filterUser = users.filter(user=>user.role !== 'admin' && user.role !== 'customer')
        await res.json(filterUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server errror in posts.js");
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        //Does user exist?
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ message: "Invalid credentials" }] });
        }
        //Check plain text against encrypted password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ message: "Invalid credentials" }] });
        }

        //Create payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };
        //Expiration date extreme for testing purposes
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            }
        );
        //Check if user exits
        //Get users gravatar
        //Encrypt password
        //Return json webtoken
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}