import {User} from "../models/user.model.js";

export async function syncUser(req, res) {
    try{
        const data = req.body;
        if (!data.email || !data.clerkId || !data.name) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = await User.findOne({email: data.email});
        if(user) {
            return res.status(409).json({message:"User already exist"});
        }
        const newUser = new User(data);
        await newUser.save();
        return res.status(200).json({message: "User saved successfully."});
    }catch(err){
        console.error("Error syncing user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}