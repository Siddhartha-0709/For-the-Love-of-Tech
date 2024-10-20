import userModel from "../models/user.model.js";
import postModel from "../models/post.model.js";
import uploadOnCloudinary from "../middlewares/cloudinary.middleware.js";

const signUp = async (req, res) => {
    // console.log(req.body);
    const user = new userModel(req.body);
    const checkIfUserExists = await userModel.findOne({ email: req.body.email });
    if (checkIfUserExists) {
        res.status(409).json({ message: "User already exists" });
    }
    try {
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const signIn = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            if (req.body.password === user.password) {
                res.status(200).send(user);
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateProfile = async (req, res) => {
    try {

        const user = await userModel.findOne({ userName: req.body.username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            if(req.files){
                const profilePicUrl = await uploadOnCloudinary(req.files.profilePic[0].path);//TODO:
                req.body.profilePic = profilePicUrl;
            }
            const updatedUser = await userModel.findOneAndUpdate({ userName: req.body.username }, req.body, { new: true });
            console.log(updatedUser);
            res.status(200).send('Profile Updated',updatedUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const deleteProfile = async (req, res) => {
    try {
        const user = await userModel.findOne({ userName: req.body.userName });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            const deletedUser = await userModel.findOneAndDelete({ userName: req.body.userName });
            res.status(200).send(deletedUser);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getFourRandomUsers = async (req, res) => {
    try {
        const users = await userModel.aggregate([
            { $sample: { size: 4 } }
        ]);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUserDetails = async (req, res) => {
    try {
        // console.log(req.query); // This will log the query parameters
        const user = await userModel.findOne({ userName: req.query.username }); // Extract username from req.query
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = await postModel.find({ author: user._id });
        res.status(200).json({ user, posts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

const toggleFollow = async (req, res) => {
    try {
        // Fetch the user to be followed/unfollowed and the logged-in user
        const user = await userModel.findOne({ userName: req.query.username });
        const loggedUser = await userModel.findOne({ userName: req.query.presentUser });

        // Check if both users exist
        if (!user || !loggedUser) {
            return res.status(404).json("User not found");
        }

        // Check if the logged-in user is already following the user
        const isFollowing = user.followers.includes(loggedUser._id);

        if (!isFollowing) {
            // Follow the user
            await user.updateOne({ $addToSet: { followers: loggedUser._id } }); // $addToSet prevents duplicates
            await loggedUser.updateOne({ $addToSet: { following: user._id } });
            return res.status(200).json("User has been followed");
        } else {
            // Unfollow the user
            await user.updateOne({ $pull: { followers: loggedUser._id } }); // $pull ensures removal
            await loggedUser.updateOne({ $pull: { following: user._id } });
            return res.status(200).json("User has been unfollowed");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


export { signUp, signIn, updateProfile, deleteProfile, getFourRandomUsers, getUserDetails, toggleFollow };