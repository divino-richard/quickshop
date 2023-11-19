import mongoose from "mongoose";

const DB_URI = 'mongodb://127.0.0.1:27017/onlineshop';

export async function dbConnect() {
    await mongoose.connect(DB_URI);
}
