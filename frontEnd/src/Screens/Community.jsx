import React, { useEffect } from 'react'
import { CircleUserRound, Cross, Forward, HeartIcon, MessageSquareMore, Search, Share, X } from 'lucide-react';
import '../Screens/Community.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Header from './Header';
import Loader from './Loader';
import Heart from 'react-animated-heart';
import Loader2 from './Loader2';
import Trending from './TrendingandSearch';
function Community() {
    // Extracting data from location state
    const location = useLocation();
    const { data } = location.state || {};
    const navigate = useNavigate();

    const [youMayKnow, setYouMayKnow] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [user, setUser] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        media: null,
        comment: ''
    });
    const [loader, setLoader] = useState(true);

    const getUserData = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/info?username=${data.userName}`);
            setUser(response.data.user);
            setLoader(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getRandomUser = async () => {
        try {
            setLoader(true);
            const response = await axios.get('https://siddharthapro.in/app3/api/v1/user/getrandomusers');
            // console.log(response.data);
            const randomUsers = response.data.filter((user) => user._id !== data._id);
            // console.log(randomUsers);
            setYouMayKnow(randomUsers);
            setLoader(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getPosts = async () => {
        try {
            setLoader(true);
            const response = await axios.get('https://siddharthapro.in/app3/api/v1/post/getposts');
            console.log('Posts');
            console.log(response.data);
            setPosts(response.data);
            setLoader(false);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleFollowers = async (username) => {
        try {
            setLoader(true);
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/togglefollowers?username=${username}&presentUser=${data.userName}`);
            // console.log(response.data);
            setLoader(false);
            // Fetch updated data without reloading the page
            await getRandomUser();
            // navigate('/community', { state: { data: data } });
            // window.location.reload({ state: { data: data } });
            // window.location.reload('/login');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, media: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSubmit.append(key, formData[key]);
        });
        formDataToSubmit.append('author', data._id);
        try {
            setLoader(true);
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/post/create', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // alert('Post created successfully!');
            setLoader(false);
            toggleModal();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Handle comments submission
    const handleCommentsSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare the comment data
            setLoader(true);
            const commentData = {
                commentText: formData.comment,
                postId: selectedPostId, // Make sure you have a selectedPostId from the clicked post
                userId: data._id,
            };
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/post/comment', commentData);
            console.log('Comment submitted:', response.data);
            // alert('Comment submitted successfully!');
            setFormData({ comment: '' });
            setIsCommentModalOpen(false);
            getPosts();
            setLoader(false);
            window.location.reload();
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment');
        }
    };

    const getComments = async (postId) => {
        try {
            setLoader(true);
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/post/getcomments?postId=${postId}`);
            console.log(response.data);
            setComments(response.data);
            setLoader(false);
        } catch (error) {
            console.log(error);
        }
    }

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

    const likePost = async (postId) => {
        try {
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/post/likepost?postId=${postId}&userId=${data._id}`);
            console.log(response.data);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
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


    const navigateToUserProfile = (username, presentUser) => {        
        navigate('/userprofile', { state: { username, presentUser } });
        ///userProfile?username=${item.userName}&presentUser=${data.userName}
    }

    useEffect(() => {
        getRandomUser();
        getPosts();
        getUserData();
        toggleFollowers();
    }, []);


    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center bg-black rounded-lg p-6 border border-gray-700">
                        {/* Modal Header */}
                        <div className='grid grid-cols-2 w-full'>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Create New Post</h2>
                            </div>
                            <div className='flex justify-end'>
                                <button onClick={toggleModal}>
                                    <X size={32} color='white' />
                                </button>
                            </div>
                        </div>

                        {/* Loader or Form */}
                        {loader ? (
                            <Loader2 />
                        ) : (
                            <form onSubmit={handleSubmit} className="w-full max-w-md mt-4">
                                {/* Title Input */}
                                <textarea
                                    name="title"
                                    placeholder="Enter post description"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full h-32 p-3 bg-black text-white border border-gray-700 rounded-md mb-4 resize-none"
                                />

                                {/* File Input */}
                                <input
                                    type="file"
                                    name="media"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="w-full p-3 bg-black text-white border border-gray-700 rounded-md mb-4"
                                />

                                {/* Image Preview */}
                                {formData.media && (
                                    <div className="mb-4">
                                        <img
                                            src={URL.createObjectURL(formData.media)}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-md"
                                        />
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-600 transition duration-200"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

            )}

            {isCommentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg bg-black rounded-lg shadow-lg border border-gray-700">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h2 className="text-xl font-bold text-white">Create New Comment</h2>
                            <button onClick={() => setIsCommentModalOpen(!isCommentModalOpen)} className="focus:outline-none">
                                <X size={24} color="white" />
                            </button>
                        </div>

                        {/* Comments List */}
                        {loader ? (
                            <Loader2 />
                        ) :
                            <>
                                <div className="p-4 max-h-96 overflow-y-auto">
                                    {comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <div key={comment._id} className="flex items-start space-x-4 py-4 border-b border-gray-700">
                                                <img src={comment.author.profilePic} alt={comment.author.name} className="w-12 h-12 object-cover rounded-full" />
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2">
                                                        <p className="text-sm font-medium text-white">{comment.author.name}</p>
                                                    </div>
                                                    <p className="text-sm text-gray-400">@{comment.author.userName}</p>
                                                    <p className="mt-2 text-sm text-gray-300">{comment.comment}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-sm text-gray-400">No comments yet.</p>
                                    )}
                                </div>

                                {/* Comment Input Form */}
                                <form onSubmit={handleCommentsSubmit} className="p-4 border-t border-gray-700">
                                    <input
                                        type="text"
                                        name="comment"
                                        placeholder="Enter comment here"
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-black text-white border border-gray-500 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
                                    />
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-600 transition duration-200"
                                        >
                                            Submit Comment
                                        </button>
                                    </div>
                                </form>
                            </>
                        }
                    </div>
                </div>


            )}

            <div className='bg-black grid grid-cols-1 md:grid-cols-[2.5fr_3.8fr_2.5fr] min-h-screen'>
                <Header />
                {/* Left section (Profile & People You May Know) */}
                <div className='bg-black p-4 md:pb-8 hidden md:block border-r border-gray-700 pt-16' style={{ position: 'sticky', top: '0', height: '100vh' }}>
                    {/* Profile Section */}
                    <div className='bg-black md:h-96 mb-5 mt-5'>
                        <img
                            src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className='w-full object-cover rounded-t-lg'
                            style={{ height: '150px' }}
                        />
                        <div className='flex justify-center relative' style={{ top: '-85px' }}>
                            <button
                                onClick={() => navigateToUserProfile(user.userName, data.userName)}
                                className='text-blue-500 hover:text-blue-300 transition-colors duration-200'
                            >
                                <img
                                    src={user.profilePic}
                                    alt=""
                                    className='rounded-full w-32 h-32 sm:w-40 sm:h-40 object-cover border-2 border-white'
                                />
                            </button>
                        </div>
                        <div className='text-center' style={{ top: '-60px', position: 'relative' }}>
                            <h1 className='text-white text-2xl'>{user.name}</h1>
                            <h2 className='text-gray-400 text-md'>@{user.userName}</h2>
                            <p className='text-gray-400 text-sm mb-4'>{user.bio}</p>
                            <div className='flex justify-around'>
                                <div className='text-center'>
                                    <h1 className='text-white text-lg'>Followers</h1>
                                    <p className='text-gray-400'>{user.followers?.length || 0}</p>
                                </div>
                                <div className='text-center'>
                                    <h1 className='text-white text-lg'>Following</h1>
                                    <p className='text-gray-400'>{user.following?.length || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* People You May Know Section */}
                    <div className='bg-black border-t border-gray-700 p-4'>
                        <h1 className='text-white text-lg font-semibold mb-3'>People You May Know</h1>
                        <div className='space-y-4'>
                            {youMayKnow.map((item, index) => (
                                loader ? <Loader2 /> : <>
                                    <div key={index} className='flex items-center'>
                                        <button
                                            onClick={() => navigateToUserProfile(item.userName, data.userName)}
                                            className='rounded-full h-10 w-10 sm:h-12 sm:w-12 object-cover hover:scale-105 transition-transform duration-200 focus:cursor-pointer'
                                        >
                                            <img
                                                src={item.profilePic}
                                                alt=""
                                                className='rounded-full h-10 w-10 sm:h-12 sm:w-12 object-cover'
                                            />
                                        </button>
                                        <div className='ml-4'>
                                            <button
                                                onClick={() => navigateToUserProfile(item.userName, data.userName)}
                                                className="text-left"
                                            >
                                                <h1 className='text-white text-md'>{item.name}</h1>
                                                <h2 className='text-gray-400 text-sm'>@{item.userName}</h2>
                                            </button>
                                        </div>
                                        {/* {data.userName === item.userName ? null : (
                                            data.following?.includes(String(item._id)) ? (
                                                <button
                                                    className='ml-auto text-blue-500 hover:text-blue-300 py-1 px-3 font-semibold transition-colors duration-200'
                                                    onClick={() => {
                                                        
                                                    }}
                                                >
                                                    View Profile
                                                </button>
                                            ) : (
                                                <button
                                                    className='ml-auto text-blue-500 hover:text-blue-300 py-1 px-3 font-semibold transition-colors duration-200'
                                                    onClick={() => {
                                                        
                                                    }}
                                                >
                                                    View Profile
                                                </button>
                                            )
                                        )} */}
                                        {data.userName === item.userName ? null : (
                                            data.following?.includes(String(item._id)) ? (
                                                <button
                                                    className='ml-auto text-red-500 hover:text-red-300 py-1 px-3  font-semibold transition-colors duration-200'
                                                    onClick={async () => {
                                                        await toggleFollowers(item.userName);
                                                        const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/info?username=${data.userName}`);
                                                        setData(response.data.user);
                                                    }}
                                                >
                                                    Unfollow
                                                </button>
                                            ) : (
                                                <button
                                                    className='ml-auto text-blue-500 hover:text-blue-300 py-1 px-3 font-semibold transition-colors duration-200'
                                                    onClick={async () => {
                                                        await toggleFollowers(item.userName);
                                                        const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/info?username=${data.userName}`);
                                                        setData(response.data.user);
                                                    }}
                                                >
                                                    Follow
                                                </button>
                                            )
                                        )}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center section (Posts List) */}
                <div className='bg-black overflow-y-auto pt-14 md:pt-16 md:w-full'>
                    <div className="bg-black flex items-center p-3 border-b border-gray-700 mt-5">
                        <button
                            onClick={() => navigateToUserProfile(user.userName, data.userName)}
                            className="hover:scale-105 transition-transform duration-200 focus:cursor-pointer"
                        >
                            <img
                                src={data.profilePic}
                                alt=""
                                className="object-cover rounded-full w-10 h-10 sm:w-12 sm:h-12 ml-2 mr-2 border-2 border-white"
                            />
                        </button>
                        <button
                            className="w-full ml-3 p-3 bg-transparent text-white border border-gray-700 text-left cursor-pointer rounded-md"
                            onClick={() => {
                                toggleModal();
                            }}
                        >
                            What's up there?
                        </button>
                    </div>

                    {
                        loader ? <div className="flex flex-col justify-center items-center py-16 px-10">
                            <Loader2 />
                        </div> : <>
                            {posts.map((item, index) => (
                                <div className="bg-black p-4 mb-4 border-b border-gray-700" key={index}>
                                    <button
                                        onClick={() => navigateToUserProfile(item.author.userName, data.userName)}
                                        className="flex items-center w-full text-left hover:cursor-pointer"
                                    >
                                        <img
                                            src={item.author.profilePic}
                                            alt=""
                                            className="object-cover rounded-full w-10 h-10 sm:w-12 sm:h-12 ml-2 mr-2 border-2 border-white"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-white font-semibold text-md">
                                                {item.author.name}
                                            </p>
                                            <p className="text-white text-sm">
                                                @{item.author.userName}
                                            </p>
                                        </div>
                                    </button>
                                    <div className="mt-3">
                                        <p className="text-white text-md mb-2 break-words">
                                            {renderWithLinks(item.title)}
                                        </p>
                                        {item.mediaUrl && (
                                            <img src={item.mediaUrl} alt="" className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" />
                                        )}
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 text-center border-t border-gray-700 pt-2">
                                        <button className='flex justify-center items-center hover:text-gray-500'
                                            onClick={() => likePost(item._id)}>
                                            {
                                                item.likes?.includes(data._id) ? (
                                                    <>
                                                        <HeartIcon className="w-6 h-6 text-red-500" />
                                                        <p className='text-white text-sm ml-1'>Liked</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <HeartIcon className="w-6 h-6 text-white" />
                                                        <p className='text-white text-sm ml-1'>Like</p>
                                                    </>
                                                )
                                            }
                                        </button>
                                        <button className='flex justify-center items-center hover:text-gray-500'
                                            onClick={() => {
                                                getComments(item._id);
                                                setSelectedPostId(item._id);
                                                setIsCommentModalOpen(true);
                                            }}>
                                            <MessageSquareMore className="w-6 h-6 text-white" />
                                            <p className='text-white text-sm ml-1'>Comments</p>
                                        </button>
                                        <button className='flex justify-center items-center hover:text-gray-500'
                                            onClick={() => sharePost(item._id)}>
                                            <Share className="w-6 h-6 text-white" />
                                            <p className='text-white text-sm ml-1'>Share</p>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>

                <Trending data={data} />

            </div>
        </>
    )
}

export default Community