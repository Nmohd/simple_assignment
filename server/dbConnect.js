import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://unknown:12345@sandbox.1nsjpu6.mongodb.net/simpleApp")
        console.log("Mongo DB is Connected");

    } catch (error) {
        console.log("not connected")
        console.log(error);
    }
}

connectDB();