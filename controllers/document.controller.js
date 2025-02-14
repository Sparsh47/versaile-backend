import Document from "../models/document.model.js";

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