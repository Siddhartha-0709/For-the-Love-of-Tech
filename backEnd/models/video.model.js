import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    youtubeUrl: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        default: "random"
    },
    author: {
        type: String,
        default: "Siddhartha Mukherjee"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    thumbnailLink: {
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
