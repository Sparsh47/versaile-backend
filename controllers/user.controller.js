import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateJWT} from "../utils/tokenFunctions.js";

export async function signup(req, res){
    try{
        const {firstName, lastName, email, password} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        })

        await newUser.save();

        const token = generateJWT(newUser._id);

        res.cookie('authToken', token, {httpOnly:true, sameSite: "strict", secure: process.env.NODE_ENV === 'production', maxAge: 24*60*60*1000});

        return res.status(201).json({message:"User created successfully", success:true});
    }catch(err){
        return res.status(500).json({message:`Error creating new user: , ${err.message}`});
    }
}

export async function login(req, res){
    try{
        const {email, password} = req.body;
        const validUser = await User.findOne({email})
        if(validUser){
            const correctPassword = bcrypt.compare(password, validUser.password);

            if(correctPassword){
                const token = generateJWT(validUser._id)
                res.cookie("authToken", token, {httpOnly:true, sameSite: "strict"});
                return res.status(200).json({message:"User logged in successfully", success:true});
            }else{
                return res.status(401).json({message:"Invalid Credentials"});
            }
        }else{
            return res.status(400).json({message:"This email is not associated with any user. Please check the email and try again."})
        }
    }catch(err){
        return res.status(500).json({message:`Error creating new user: , ${err.message}`});
    }
}