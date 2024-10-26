import Router from "express";
import { commentOnPost, createPost, deletePost, getCommentsbyPostId, getPostbyId, getPosts, likePost, sendMail } from "../controllers/post.controller.js";
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
router.route('/comment').post(commentOnPost);
router.route('/getcomments').get(getCommentsbyPostId);
router.route('/likepost').get(likePost);
router.route('/sendmail').post(sendMail);
export default router