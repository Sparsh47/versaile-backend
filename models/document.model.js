import mongoose, {model, Schema} from "mongoose";

const documentSchema = new Schema({
    _id: String, data: Object, userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", default: null
    }
}, {
    collection: "documents",
});

const Document = model("Document", documentSchema);

export default Document;
