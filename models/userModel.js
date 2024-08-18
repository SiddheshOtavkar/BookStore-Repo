import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //use to remove white space
    },
    email: {
        type: String,
        required: true,
        unique: true //Ek email se ek baar he login hona chahiye
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: {},
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model('users', userSchema); 