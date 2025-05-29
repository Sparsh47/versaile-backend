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

    if (this.data && this.data.ops && Array.isArray(this.data.ops) && this.data.ops.length > 0) {
        const firstLine = this.data.ops[0].split("\n")[0].trim();
        if (firstLine) {
            this.documentTitle = firstLine;
        } else {
            this.documentTitle = "Untitled";
        }
    } else {
        this.documentTitle = "Untitled";
    }

    if (!this.documentTitle && this.userId) {
        try {
            const count = await mongoose.models.Document.countDocuments({
                userId: this.userId,
            });
            this.documentTitle = `Untitled-${count + 1}`;
        } catch (error) {
            return next(error);p
        }
    }

    next();
});

const Document = model("Document", documentSchema);
export default Document;
