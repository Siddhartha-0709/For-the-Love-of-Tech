import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required: true,
        default: "random",
        unique: true
    },
    author:{
        type: String,
        default: "Siddhartha Mukherjee"
    },
    description:{
        type: String,
        default: "random"
    },
    coverImage:{
        type: String,
        default: "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
    },
    price:{
        type: Number,
        default: 0
    },
    videos:{
        type: Array,
        default: []
    }
},{timestamps: true})

export default mongoose.model("Course", courseSchema)