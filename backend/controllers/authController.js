const User = require('../models/User')
const jwt = require("jsonwebtoken");

//generate JWT token
const generateToken = (id) => {
    return jwt.sign ({id}, process.env.JWT_SECRET, { expiresIn: "1h"});
}

// register user
exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    //validation: check for mising fields
    if(!fullName || !email || !password){
        return res.statu(400).json({message: "All fields are required"});
    }

    try{
        //check if email already exists
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "Email already in use"});
        }

        //create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id:user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
        .status(500)
        .json
    }
};

// login user
exports.loginUser = async (req, res) => {};

// getUserInfo 
exports.getUserInfo = async (req, res) => {};