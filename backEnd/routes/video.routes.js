import { Router } from "express";
import {videoUpload, getVideos, getVideosbyCourseName} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/upload").post(
    upload.fields(
        [
            { name: "videoImage", maxCount: 1 }
        ]
    ), videoUpload
);
router.route("/get").get(getVideos);
router.route("/getbycourse/:courseName").get(getVideosbyCourseName);

export default router;