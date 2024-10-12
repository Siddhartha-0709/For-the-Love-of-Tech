import postModel from "../models/post.model.js";
import uploadOnCloudinary from "../middlewares/cloudinary.middleware.js";
import userModel from "../models/user.model.js";
const createPost = async (req, res) => {
    try {
        const {title, author} = req.body;
        // const media = req.files;
        // console.log(req);
        const mediaUrl = await uploadOnCloudinary(req.files.media[0].path);
        const newPost = new postModel({title, author, mediaUrl});
        await newPost.save();
        const user = await userModel.findById(author);
        // console.log(user);
        user.posts = [...user.posts, newPost._id];
        await user.save();
        res.status(200).send(newPost);
        console.log('Post Created Successfully');

    } catch (error) {
        console.log('Here Error');
        console.log(error);
        res.status(500).send(error);
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('author', '-password -__v');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPostsByUser = async (req, res) => {
    try {
        const posts = await postModel.find({author: req.params.id});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        console.log(req.query.postId);
        const deletedPost = await postModel.findOneAndDelete({_id: req.query.postId});
        res.status(200).send(deletedPost, 'Post Deleted Successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

const likePost = async (req, res) => {
    try {
        const updatedPost = await postModel.findOneAndUpdate({_id: req.params.id}, {$inc: {likes: 1}});
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send(error);
    }
}

const commentOnPost = async (req, res) => {
    try {
        const updatedPost = await postModel.findOneAndUpdate({_id: req.params.id}, {$push: {comments: req.body}});
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getPostbyId = async (req, res) => {
    try {
        const post = await postModel.findById(req.query.id);
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
}
export {createPost, getPosts, getPostsByUser, deletePost, likePost, commentOnPost, getPostbyId}