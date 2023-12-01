import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    }
}, {timestamps: true});

export const CategoryModel = mongoose.model('Categories', categorySchema);