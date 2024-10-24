import {uploadOnCloudinary} from "../middlewares/cloudinary.middleware.js";
import courseModel from "../models/course.model.js";
import videoModel from "../models/video.model.js";
import ytdl from "ytdl-core";

const videoUpload = async (req, res) => {
    try {
        const { youtubeUrl, courseName, author } = req.body;
        console.log('Files Are:',req.files);
        
        const thumbnailUrl = await uploadOnCloudinary(req.files.videoImage[0].path);
        if (!thumbnailUrl) {
            throw new Error("File not uploaded on Cloudinary");
            return null;
        }
        // Fetch video details using ytdl-core
        const videoInfo = await ytdl.getInfo(youtubeUrl);
        const videoTitle = videoInfo.videoDetails.title;
        const videoDescription = videoInfo.videoDetails.description;
        const thumbnailLink = thumbnailUrl; // Get the first thumbnail
        const videoDuration = videoInfo.videoDetails.lengthSeconds; // Duration in seconds

        // Check if course exists, if not, create a new course
        let course = await courseModel.findOne({ courseName });
        if (!course) {
            course = new courseModel({ courseName, author });
            console.log('New Course Created Successfully');
        }
        
        // Add video to course and save
        course.videos.push({
            youtubeUrl,
            title: videoTitle,
            description: videoDescription,
            thumbnailLink,
            duration: videoDuration,
        });
        await course.save();
        console.log('Course Updated Successfully');
        
        // Save video details to the video model
        const video = await videoModel.create({
            youtubeUrl,
            courseName,
            author,
            title: videoTitle,
            description: videoDescription,
            thumbnailLink,
            duration: videoDuration,
        });
        console.log('Video Uploaded Successfully', video);

        res.status(200).json({ message: "Video Uploaded Successfully" });
    } catch (err) {
        console.error('Error uploading video:', err);
        res.status(500).json({ error: err.message });
    }
};

const getVideos = async (req, res) => {
    try {
        const videos = await videoModel.find();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getVideosbyCourseName = async (req, res) => {
    try {
        console.log(req.params);
        const { courseName } = req.params;
        console.log(courseName);
        const videos = await videoModel.find({ courseName });
        const course = await courseModel.findOne({ courseName });
        res.status(200).json({videos, course});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export { videoUpload, getVideos, getVideosbyCourseName };
