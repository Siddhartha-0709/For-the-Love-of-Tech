import { Router } from "express";
import { getCourse, getRecentThreeCourses, updateCourse } from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/get").get(getCourse);
router.route("/get-recent").get(getRecentThreeCourses);
router.route("/update").post(
    upload.fields([
        { name: "coverImage", maxCount: 1 }
    ]),updateCourse
);

export default router;