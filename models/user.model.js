import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    document: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
    }]
},{
    collection: "users",
})

export const User = mongoose.model("User", userSchema)