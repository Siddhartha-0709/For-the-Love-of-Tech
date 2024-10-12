import Router from "express";
import { getFourRandomUsers, getUserDetails, signIn, signUp, toggleFollow, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.route('/signup').post(signUp);
router.route('/login').post(signIn);
router.route('/info').get(getUserDetails);
router.route('/update').post(
    upload.fields(
        [
            { name: "profilePic", maxCount: 1 }
        ],
    ), updateProfile
);
router.route('/getrandomusers').get(getFourRandomUsers);
router.route('/togglefollowers').get(toggleFollow);
export default router