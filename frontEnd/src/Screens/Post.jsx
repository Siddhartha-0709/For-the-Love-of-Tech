import React, { useEffect, useState } from 'react';
import Header from './Header';
import Trending from './TrendingandSearch';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { HeartIcon, MessageSquareMore, Share } from 'lucide-react';

function Post() {
    const { id } = useParams(); // Get the post ID from the URL parameters
    console.log(id);

    const [data, setData] = useState({});
    const [author, setAuthor] = useState({});

    const getPost = async () => {
        try {
            // console.log(`https://siddharthapro.in/app3/api/v1/post/getpostbyid?id=${id}`);
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/post/getpostbyid?id=${id}`);
            const postAuthorId = response.data.author; // Assuming 'author' contains the user ID
            setData(response.data);
            await getUsers(postAuthorId); // Fetch user details using the author ID
        } catch (error) {
            console.log("Error fetching post:", error);
        }
    };

    const getUsers = async (userid) => {
        try {
            const response = await axios.get('https://siddharthapro.in/app3/api/v1/user/getusers');
            const user = response.data.find((user) => user._id === userid); // Find user by ID
            if (user) {
                setAuthor(user);
            }
        } catch (error) {
            console.log("Error fetching user:", error);
        }
    };

    const sharePost = async (postId) => {
        try {
            navigator.clipboard.writeText(`https://spacesbysiddhartha.vercel.app/posts/${postId}`)
                .then(() => {
                    setCopySuccess('Text copied to clipboard!');
                })
                .catch(() => {
                    setCopySuccess('Failed to copy text');
                });
            alert('Share Link Copied to Clipboard!');
        } catch (err) {
            console.log(err);
        }
    };

    const handleJoinSpaces = () => {
        window.location.href = '/login';
    }

    const renderWithLinks = (text) => {
        const urlPattern = /(https?:\/\/[^\s]+)/g; // Regex to detect URLs
        return text.split(urlPattern).map((part, index) => {
            if (urlPattern.test(part)) {
                return (
                    <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    
    useEffect(() => {
        getPost();
    }, []); // Only run on initial mount

    return (
        <div className="bg-black grid grid-cols-1 min-h-screen">
            <Header />
            <div className="bg-black p-6 mb-4 border border-gray-700 w-[95%] md:w-[45%] mx-auto mt-20 rounded-lg min-h-[500px] overflow-y-auto custom-scrollbar flex flex-col">
                {/* Author Section */}
                <div className="flex items-center gap-1 mb-2 hover:cursor-pointer" onClick={handleJoinSpaces}>
                    {author.profilePic && (
                        <img
                            src={author.profilePic}
                            alt={author.name}
                            className="object-cover rounded-full w-10 h-10 sm:w-12 sm:h-12 border-2 border-white"
                        />
                    )}
                    <div className="flex flex-col">
                        <p className="text-white font-semibold text-md">{author.name}</p>
                        <p className="text-white text-sm">@{author.userName}</p>
                    </div>
                </div>

                {/* Title and Media */}
                <div className="mt-3">
                    <h2 className="text-white text-md mb-2">{renderWithLinks(data.title)}</h2>
                    {data.mediaUrl && (
                        <img
                            src={data.mediaUrl}
                            alt="Post media"
                            className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover rounded-lg shadow-lg mt-2"
                        />
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 grid grid-cols-3 text-center border-t border-gray-700 pt-2">
                    <button
                        className="flex justify-center items-center hover:text-gray-500"
                        onClick={() => {
                            handleJoinSpaces();
                        }}
                    >
                        <HeartIcon className="w-6 h-6 text-white" />
                        <p className="text-white text-sm ml-1">Like</p>
                    </button>
                    <button
                        className="flex justify-center items-center hover:text-gray-500"
                        onClick={() => {
                            handleJoinSpaces();
                        }}
                    >
                        <MessageSquareMore className="w-6 h-6 text-white" />
                        <p className="text-white text-sm ml-1">Comments</p>
                    </button>
                    <button
                        className="flex justify-center items-center hover:text-gray-500"
                        onClick={() => {
                            sharePost(data._id);
                        }}
                    >
                        <Share className="w-6 h-6 text-white" />
                        <p className="text-white text-sm ml-1">Share</p>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Post;
