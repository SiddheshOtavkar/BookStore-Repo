import mongoose from "mongoose";

const semSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        lowercase: true,
    },
});

export default mongoose.model("Semester", semSchema);