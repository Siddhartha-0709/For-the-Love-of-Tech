import Router from "express";
import { createPost, deletePost, getPostbyId, getPosts } from "../controllers/post.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/create').post(
    upload.fields(
        [
            { name: "media", maxCount: 1 }
        ]
    ), createPost
);

router.route('/getposts').get(getPosts);
router.route('/delete').get(deletePost);
router.route('/getpostbyid').get(getPostbyId);
export default router