import mongoose, { model, Schema } from "mongoose";

const documentSchema = new Schema({
    data: Object,
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }],
    documentTitle: {
        type: String,
    },
}, {
    collection: "documents",
});

documentSchema.pre("save", async function (next) {
    if (this.documentTitle) return next();

    if (this.userId && this.userId.length > 0) {
        const count = await mongoose.models.Document.countDocuments({
            userId: { $in: this.userId },
        });

        this.documentTitle = `Untitled-${count + 1}`;
    } else {
        this.documentTitle = "Untitled";
    }

    next();
});

const Document = model("Document", documentSchema);
export default Document;
