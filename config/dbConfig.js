import mongoose from "mongoose";

export async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    }catch(err){
        console.log("Failed to connect to DB");
    }
}