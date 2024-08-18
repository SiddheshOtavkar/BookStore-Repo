import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        semester: {
            type: mongoose.ObjectId,
            ref: "Semester",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            type: Boolean,
        },
        owner: {
            type: String,
            required: true,
        },
        upi: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("books", bookSchema);