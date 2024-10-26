import postModel from "../models/post.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import userModel from "../models/user.model.js";
import commentsModel from "../models/comments.model.js";
import nodemailer from "nodemailer";


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

        newPostNotification(newPost);

        res.status(200).send(newPost);
        console.log('Post Created Successfully ');

    } catch (error) {
        console.log('Here Error');
        console.log(error);
        res.status(500).send(error);
    }
};


const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
            .populate('author', '-password');
        const responsePosts = posts.map(post => ({
            ...post.toObject(),
            likes: post.likes.map(like => like.toString())
        }));

        res.status(200).json(responsePosts);
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
        if (deletedPost.mediaUrl) {
            deleteOnCloudinary(deletedPost.mediaUrl);
        }
        console.log(deletedPost);
        res.status(200).send(deletedPost, 'Post Deleted Successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.query;
        const post = await postModel.findById(postId);
        if (post.likes.includes(userId)) {
            post.likes.splice(post.likes.indexOf(userId), 1);
        } else {
            post.likes.push(userId);
        }
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
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


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendMail = async (req, res) => {
    console.log(req.body);
    try {
        await transporter.sendMail({
            to: "siddharthamukherjee0709@gmail.com",
            subject: "Test",
            html: "<h1>Hello Test Mail from NodeMailer</h1>"
        });
        console.log("Email sent");
        res.status(200).send(req.body);
    } catch (error) {
        res.status(500).send(error);
    }
}

const newPostNotification = async (data) => {
    try {
        const emailList = await userModel.find();
        for (const user of emailList) {
            if (user.email) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "New Post on Spaces for Developers",
                    html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <!-- Email Content -->
                                    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
                                        style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        <tr>
                                            <td style="background-color: #4a90e2; text-align: center;">
                                                <img src="https://res.cloudinary.com/djf6ew5uc/image/upload/v1729115576/spaces/syqzb6t8je2bwl1g1fxx.png"
                                                    alt="Spaces Logo" width="100%" style="display: block; margin: 0 auto;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 40px;">
                                                <p style="margin: 0 0 20px; color: #000000; font-size: 16px; line-height: 1.5;">
                                                    Hi ${user.name},<br><br>A new article has been published on Spaces that we thought you'd
                                                    be interested in!
                                                </p>
                                                <p style="margin: 0 0 20px; color: #000000; font-size: 16px; line-height: 1.5;">
                                                    <strong>Title:</strong> ${data.title.substring(0, 50)}${data.title.length > 50 ? '...' :
                                                ''}<br>
                                                    Read it here: <a href="https://spacesbysiddhartha.vercel.app/posts/${data._id}"
                                                        style="color: #4a90e2; text-decoration: none;">https://spacesbysiddhartha.vercel.app/posts/${data._id}</a>
                                                </p>
                                                <p style="margin: 0 0 0px; color: #000000; font-size: 16px; line-height: 1.5;">
                                                    <img src="${data.mediaUrl}" alt="" style="max-width: 100%; height: auto; border-radius: 8px;">
                                                </p>
                                            </td>
                                        <tr>
                                            <td
                                                style="background-color: #f8f8f8; padding: 30px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                                                <p style="margin: 0 0 10px; color: #333; font-size: 13px; font-weight: bold;">
                                                    Join the Spaces Community to Stay Updated about the latest happenings in Tech!
                                                </p>
                                                <a href="https://spacesbysiddhartha.vercel.app/signup"
                                                    style="display: inline-block; margin: 10px 0; padding: 10px 20px; background-color: #4a90e2; color: #fff; text-decoration: none; border-radius: 5px;">
                                                    Join Now
                                                </a>
                                                <p style="margin: 20px 0 0; color: #999999; font-size: 14px;">
                                                    © 2024 Spaces. All rights reserved.
                                                </p>
                                                <p style="margin: 20px 0 0; color: #999999; font-size: 14px;">
                                                    If you wish to unsubscribe from mailing list, please write an email at <a href="mailto:siddharthamukherjee0709@gmail.com"
                                                        style="color: #4a90e2; text-decoration: none;">siddharthamukherjee0709@gmail.com</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>`
                };
                // console.log("Email sent to ", user.email);
                //await transporter.sendMail(mailOptions);
                if (user.email === "siddharthamukherjee0709@gmail.com") {
                    await transporter.sendMail(mailOptions);
                    console.log("Email sent to siddharthamukherjee0709@gmail.com");
                }
                if (user.email === "dasrishav446@gmail.com") {
                    await transporter.sendMail(mailOptions);
                    console.log("Email sent to siddharthamukherjee0709@gmail.com");
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export { createPost, getPosts, getPostsByUser, deletePost, likePost, commentOnPost, getPostbyId, getCommentsbyPostId, sendMail };