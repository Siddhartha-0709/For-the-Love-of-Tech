import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HeartIcon, MessageSquareMore, Share, TrashIcon, X } from 'lucide-react';
import Header from './Header';
import Trending from './TrendingandSearch';
import Loader from './Loader';

function UserProfile() {



    const location = useLocation();

    const { state } = location;
    const { username: username, presentUser: currentUser } = state || {};

    // console.log('Username:', username);
    // console.log('Current User:', currentUser);

    // const queryParams = new URLSearchParams(location.search);
    // const username = queryParams.get('username');
    // const currentUser = queryParams.get('presentUser');


    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [currentUserData, setCurrentUserData] = useState({});
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        media: null,
        comment: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    const getUserData = async () => {
        try {
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/info?username=${username}`);
            console.log('User Data:', response.data.user);
            setUserData(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const getCurrentUserDetails = async () => {
        try {
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/info?username=${currentUser}`);
            setCurrentUserData(response.data.user);
            console.log('Current User-', response.data.user);

        } catch (err) {
            console.log(err);
        }
        finally {
            // console.log(currentUserData);

        }
    }

    const toggleFollowers = async (username) => {
        try {
            // console.log(data);

            console.log(currentUser, 'will follow', username);
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/togglefollowers?username=${username}&presentUser=${currentUser}`);
            // console.log(response.data);
            // refresh the page
            navigation('/userprofile', { state: { username: username, presentUser: currentUser } });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeletePost = async (postId) => {
        try {
            const action = prompt('Type "Yes" to delete post');
            console.log(action);
            if (action !== 'Yes') {
                return;
            }
            console.log('Deleting post:', `https://siddharthapro.in/app3/api/v1/post/delete?postId=${postId}`);
            console.log(postId);
            await axios.get(`https://siddharthapro.in/app3/api/v1/post/delete?postId=${postId}`);
            setUserData((prevData) => ({
                ...prevData,
                posts: prevData.posts.filter((post) => post._id !== postId),
            }));
            alert('Post deleted successfully!');
        } catch (err) {
            console.log(err);
        }
        finally {
            window.location.reload();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        await getCurrentUserDetails();
        // Create a FormData object
        const formData = new FormData();
        formData.append('name', event.target.name.value);
        // formData.append('password', event.target.password.value);
        formData.append('bio', event.target.bio.value);
        if (event.target.profilePic.files.length > 0) {
            formData.append('profilePic', event.target.profilePic.files[0]); // profilePic will be a file
        }
        formData.append('username', currentUser);

        // Validate form fields
        const fields = ['name', 'bio'];
        if (event.target.profilePic.files.length > 0) {
            fields.push('profilePic');
        }
        // for (const field of fields) {
        //     if (!event.target[field].value) {
        //         alert(`${field} cannot be empty`);
        //         return;
        //     }
        // }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        setLoading(true);
        console.log('Form data:', formData);
        try {
            // Send the form data to the backend using axios

            console.log('Sending form data:', formData);
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/user/update', formData);
            alert('Profile updated successfully!');
            toggleModal();
            setLoading(false);
            window.location.reload();
            console.log(response.data); // Log response from the backend
        } catch (err) {
            console.error('Error submitting the form', err);
        }
    };

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

    const handleCommentsSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare the comment data
            const commentData = {
                commentText: formData.comment,
                postId: selectedPostId, // Make sure you have a selectedPostId from the clicked post
                userId: currentUserData._id,
            };
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/post/comment', commentData);
            console.log('Comment submitted:', response.data);
            alert('Comment submitted successfully!');
            setFormData({ comment: '' });
            setIsCommentModalOpen(false);

            window.location.reload();
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment');
        }
    };

    const getComments = async (postId) => {
        try {
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/post/getcomments?postId=${postId}`);
            console.log(response.data);
            setComments(response.data);
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
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/post/likepost?postId=${postId}&userId=${currentUserData._id}`);
            console.log(response.data);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCurrentUserDetails();
        getUserData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!userData) {
        return <div>Error loading user data.</div>;
    }

    // Destructure user data for easier access
    const { user, posts } = userData;


    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                        <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Edit your Profile</h2>
                                <button onClick={toggleModal} className="focus:outline-none">
                                    <X size={32} color='white' />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">Edit your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={(e) => setCurrentUserData({ ...currentUserData, name: e.target.value })}
                                        placeholder={currentUserData.name}
                                        className="mt-1 block w-full p-3 rounded-md border border-gray-700 bg-black text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Bio Field */}
                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-400">Edit your Bio</label>
                                    <input
                                        type="text"
                                        name="bio"
                                        id="bio"
                                        onChange={(e) => setCurrentUserData({ ...currentUserData, bio: e.target.value })}
                                        placeholder={currentUserData.bio}
                                        className="mt-1 block w-full p-3 rounded-md border border-gray-700 bg-black text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Profile Picture Upload */}
                                <div>
                                    <label htmlFor="profilePic" className="block text-sm font-medium text-gray-400">Upload your Profile Picture</label>
                                    <input
                                        type="file"
                                        name="profilePic"
                                        id="profilePic"
                                        accept="image/*"
                                        className="mt-1 block w-full p-3 rounded-md border border-gray-700 bg-black text-gray-400 file:bg-black file:border file:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </>
            ) : null}

            {isCommentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="w-full max-w-lg bg-black rounded-lg shadow-lg border border-gray-700">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h2 className="text-xl font-bold text-white">Create New Comment</h2>
                            <button onClick={() => setIsCommentModalOpen(!isCommentModalOpen)} className="focus:outline-none">
                                <X size={24} color="white" />
                            </button>
                        </div>

                        {/* Comments List */}
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
                    </div>
                </div>
            )}

            <div className='bg-black grid grid-cols-1 md:grid-cols-[2.5fr_3.8fr_2.5fr] h-screen'>
                <Header />
                {/* Profile Section */}
                <div className='hidden md:block bg-black rounded-lg pt-16 w-full border-r border-gray-700 h-screen' style={{ position: 'sticky', top: '0' }}>
                    <div className='w-full p-4'>

                        {/* Cover Image */}
                        <img
                            src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Cover"
                            className='h-48 w-full object-cover rounded-t-lg'
                        />

                        {/* Profile Image */}
                        <img
                            src={user.profilePic}
                            className='rounded-full h-40 w-40 object-cover border-4 border-white absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                            alt="User profile"
                            style={{
                                position: 'relative',
                                top: '-0px',
                            }}
                        />

                        {/* User Details */}
                        <div className="text-center mt-4" style={{ marginTop: '-65px' }}>
                            <h1 className='text-white text-2xl'>{user.name}</h1>
                            <p className='text-gray-400 text-md font-semibold'>@{user.userName}</p>
                            <p className='text-gray-400 text-md font-semibold'>{user.bio}</p>
                        </div>

                        {/* Followers & Following */}
                        <div className='grid grid-cols-2 mt-6'>
                            <div className='text-center'>
                                <h1 className='text-white text-lg'>{user.following.length}</h1>
                                <p className='text-gray-400'>Following</p>
                            </div>
                            <div className='text-center'>
                                <h1 className='text-white text-lg'>{user.followers.length}</h1>
                                <p className='text-gray-400'>Followers</p>
                            </div>
                        </div>

                        {/* Profile Action Button */}
                        <div className='text-center mt-4 pb-4'>
                            {currentUserData.name === user.name ? (
                                <button
                                    className='text-white bg-black hover:text-blue-700 py-2 px-4 rounded-lg font-semibold'
                                    onClick={toggleModal}
                                >
                                    Edit Profile
                                </button>
                            ) : currentUserData.following.includes(String(user._id)) ? (
                                <button
                                    className='text-red-500 bg-black hover:text-red-700 py-2 px-4 rounded-lg font-semibold'
                                    onClick={() => toggleFollowers(username)}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    className='text-white bg-black hover:text-blue-700 py-2 px-4 rounded-lg font-semibold'
                                    onClick={() => toggleFollowers(username)}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className='block md:hidden bg-black rounded-lg pt-16 w-full border-r border-gray-700' style={{ position: '', top: '0' }}>
                    <div className='w-full p-4'>

                        {/* Cover Image */}
                        <img
                            src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Cover"
                            className='h-28 w-full object-cover rounded-t-lg'
                        />

                        {/* Profile Image */}
                        <img
                            src={user.profilePic}
                            className='rounded-full h-40 w-40 object-cover border-4 border-white absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                            alt="User profile"
                            style={{
                                position: 'relative',
                                top: '-5px',
                                left: '100px',
                            }}
                        />

                        {/* User Details */}
                        <div className="text-left" style={{ marginTop: '120px', position: 'relative' }}>
                            <div className="text-left mt-4" style={{ marginTop: '-195px', marginLeft: '25px' }}>
                                <h1 className='text-white text-2xl'>{user.name}</h1>
                                <p className='text-gray-400 text-md font-semibold'>@{user.userName}</p>
                                <p className='text-gray-400 text-md font-semibold'>{user.bio}</p>
                            </div>
                            {/* Followers & Following */}
                            <div className='grid grid-cols-2 mt-6'>
                                <div className='text-center'>
                                    <h1 className='text-white text-lg'>{user.following.length}</h1>
                                    <p className='text-gray-400'>Following</p>
                                </div>
                                <div className='text-center'>
                                    <h1 className='text-white text-lg'>{user.followers.length}</h1>
                                    <p className='text-gray-400'>Followers</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Action Button */}
                        <div className='text-center mt-4 pb-4'>
                            {currentUserData.name === user.name ? (
                                <button
                                    className='text-white bg-black hover:text-blue-700 py-2 px-4 rounded-lg font-semibold'
                                    onClick={toggleModal}
                                >
                                    Edit Profile
                                </button>
                            ) : currentUserData.following.includes(String(user._id)) ? (
                                <button
                                    className='text-red-500 bg-black hover:bg-gray-700 py-2 px-4 rounded-lg font-semibold'
                                    onClick={() => toggleFollowers(username)}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    className='text-white bg-black hover:bg-gray-700 py-2 px-4 rounded-lg font-semibold'
                                    onClick={() => toggleFollowers(username)}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                </div>


                {/* Posts Section */}
                <div className='bg-black md:border border-gray-700 md:pt-24 pl-4 pr-4 rounded-lg min-h-screen overflow-y-auto custom-scrollbar'>
                    {currentUserData.userName === username ? (
                        <h1 className='text-white text-2xl font-semibold mb-4'>Your Posts</h1>
                    ) : (
                        <h1 className='text-white text-2xl font-semibold mb-4'>Posts</h1>)}

                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id} className='bg-black text-white mt-4 p-8 w-full mx-auto rounded-lg border border-gray-700'>
                                <div className="flex items-center mb-4">
                                    <img
                                        src={userData.user.profilePic}
                                        alt={userData.user.name}
                                        className="object-cover rounded-full w-12 h-12 border-2 border-white"
                                    />
                                    <div className="ml-4">
                                        <p className="text-white font-semibold text-lg">{userData.user.name}</p>
                                        <p className="text-gray-400 text-sm">@{userData.user.userName}</p>
                                    </div>
                                    {currentUserData.userName === username && (
                                        <button
                                            className="ml-auto text-gray-400 hover:text-gray-300"
                                            onClick={() => handleDeletePost(post._id)}
                                        >
                                            <TrashIcon className="w-6 h-6 text-red-500" />
                                        </button>
                                    )}
                                </div>

                                <p className="text-white text-md mb-2 break-words">
                                    {renderWithLinks(post.title)}
                                </p>

                                {post.mediaUrl && (
                                    <img src={post.mediaUrl} alt="" className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" />
                                )}

                                {/* Post Action Buttons */}
                                <div className="mt-4 grid grid-cols-3 text-center border-t border-gray-700 pt-2">
                                    <button className='flex justify-center items-center hover:text-gray-500'
                                        onClick={() => likePost(post._id)}>
                                        {
                                            post.likes?.includes(currentUserData._id) ? (
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
                                            getComments(post._id);
                                            setSelectedPostId(post._id);
                                            setIsCommentModalOpen(true);
                                        }}>
                                        <MessageSquareMore className="w-6 h-6 text-white" />
                                        <p className='text-white text-sm ml-1'>Comments</p>
                                    </button>
                                    <button className='flex justify-center items-center hover:text-gray-500'
                                        onClick={() => sharePost(post._id)}>
                                        <Share className="w-6 h-6 text-white" />
                                        <p className='text-white text-sm ml-1'>Share</p>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-400'>No posts available.</p>
                    )}
                </div>
                {/* Search Section and Trending */}
                <Trending data={currentUserData} />
            </div>

        </>
    );
}

export default UserProfile;
