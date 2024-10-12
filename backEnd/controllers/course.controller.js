import uploadOnCloudinary from "../middlewares/cloudinary.middleware.js";
import courseModel from "../models/course.model.js";
const updateCourse = async (req, res) => {
    const {courseName, author, description, price} = req.body;

    let coverImage = req.files.coverImage[0].path;
    coverImage = await uploadOnCloudinary(coverImage);
    const course = await courseModel.findOne({courseName});
    if(!course){
        const newCourse = new courseModel({courseName, author, description, coverImage, price});
        await newCourse.save();
        console.log('New Course Created Successfully');
    }
    else{
        course.author = author;
        course.description = description;
        course.coverImage = coverImage;
        course.price = price;
        await course.save();
        console.log('Course Updated Successfully');
    }
    res.status(200).json({ message: "Course Updated Successfully" });
}

const getCourse = async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const getRecentThreeCourses = async (req, res) => {
    try {
        const courses = await courseModel.find().limit(3);
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export {updateCourse, getCourse, getRecentThreeCourses}