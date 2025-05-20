import Document from "../models/document.model.js";
import {User} from "../models/user.model.js";

export async function findOrCreateDocument(id) {
    try{
        if (id == null) {
            return;
        }
        const document = await Document.findById(id);
        if (document) {
            return document;
        } else {
            return await Document.create({ _id: id, data: "" });
        }
    }catch(err){
        console.log(err);
    }
}


export async function saveDocument(id, data){
    await Document.findByIdAndUpdate(id, { data });
}

export async function getAllDocuments(req, res) {
    try{
        const {id} = req.params;
        const user = await User.findOne({clerkId: id});

        if(!user){
            return res.status(404).send({message:"No such user found"});
        } else {
            return res.status(200).json({documents: user.document})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error getting documents"});
    }
}

export async function addDocumentInUser(req,res){
    try {
        const {userId} = req.params;
        const {documentId} = req.body;
        const user = await User.findOne({clerkId: userId})

        if(!user){
            return res.status(404).send({message:"No such user found"});
        }else{
            user.document.push(documentId);
            await user.save();
            return res.status(200).json({message:"Document added successfully"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error adding document"});
    }
}