import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//register user
export const register = async (req,res) => {    
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturPath,
            friends,
            location,
            disability
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt); //encryption
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturPath,
            friends,
            location,
            disability,
            viewedProfile: Math.floor(Math.random() * 100),
            impressions: Math.floor(Math.random() * 100)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json({error : err.message});
    }
}