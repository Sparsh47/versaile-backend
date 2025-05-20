import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    authProvider: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    document: [{
        type: String,
        ref: "Document",
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    collection: "users",
    timestamps: true,
})

export const User = mongoose.model("User", userSchema)