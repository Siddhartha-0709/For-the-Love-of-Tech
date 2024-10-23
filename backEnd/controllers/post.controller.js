import postModel from "../models/post.model.js";
import uploadOnCloudinary from "../middlewares/cloudinary.middleware.js";
import userModel from "../models/user.model.js";
import commentsModel from "../models/comments.model.js";

const createPost = async (req, res) => {
    try {
        console.log('Request Received for Create Post Processing');
        const { title, author } = req.body;

        let mediaUrl = null; // Initialize mediaUrl to null by default

        // Check if files are present and media field exists
        if (req.files && req.files.media && req.files.media[0]) {
            console.log('Files Received');
            console.log(req.files);
            mediaUrl = await uploadOnCloudinary(req.files.media[0].path); // Upload the file if it exists
        } else {
            console.log('No Files Received');
        }

        // Create the post with or without mediaUrl
        const newPost = new postModel({ title, author, mediaUrl });
        await newPost.save();

        const user = await userModel.findById(author);
        user.posts = [...user.posts, newPost._id]; // Add the post to the user's posts array
        await user.save();

        res.status(200).send(newPost);
        console.log('Post Created Successfully');

    } catch (error) {
        console.log('Here Error');
        console.log(error);
        res.status(500).send(error);
    }
};


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
        const posts = await postModel.find({ author: req.params.id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        console.log(req.query.postId);
        const deletedPost = await postModel.findOneAndDelete({ _id: req.query.postId });
        res.status(200).send(deletedPost, 'Post Deleted Successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

const likePost = async (req, res) => {
    try {
        const updatedPost = await postModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } });
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send(error);
    }
}

const commentOnPost = async (req, res) => {
    try {
        const { postId, commentText, userId } = req.body;

        const comment = new commentsModel({ comment: commentText, author: userId, post: postId });
        await comment.save();

        const updatedPost = await postModel.findOneAndUpdate(
            { _id: postId },
            { $push: { comments: comment._id } },
            { new: true } // Return the updated post
        ).populate('comments'); // Optionally populate comments if needed

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: error.message });
    }
}


const getCommentsbyPostId = async (req, res) => {
    try {
        const postId = req.query.postId;
        const comments = await commentsModel.find({ post: postId })
            .populate('author', 'userName profilePic -_id name');
        res.status(200).send(comments);
    } catch (error) {
        console.log(error);
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
export { createPost, getPosts, getPostsByUser, deletePost, likePost, commentOnPost, getPostbyId, getCommentsbyPostId }