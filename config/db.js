import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://0.0.0.0:27017/BookStore")
    if (conn) {
        // console.log("Connected successfully to Database");
        // console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white);
        console.log(`Connected to Mongodb Database LocalHost`.bgMagenta.white);
    }
    else {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;