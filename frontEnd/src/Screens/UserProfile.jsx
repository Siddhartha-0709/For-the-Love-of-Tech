import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HeartIcon, MessageSquareMore, Share, TrashIcon, X } from 'lucide-react';
import Header from './Header';

function UserProfile() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    const currentUser = queryParams.get('presentUser');
    const navigation = useNavigate();
    // console.log('Current User',currentUser);
    // console.log('Username',username);

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [currentUserData, setCurrentUserData] = useState({});

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
            navigation('/login');
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
        formData.append('profilePic', event.target.profilePic.files[0]); // profilePic will be a file
        formData.append('username', currentUser);
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
            console.log(response.data); // Log response from the backend
        } catch (err) {
            console.error('Error submitting the form', err);
        }
    };

    useEffect(() => {
        getCurrentUserDetails();
        getUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
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

            <Header />
            <div className="flex flex-col pt-8 md:p-8 bg-black mt-10 ">
                <div className='bg-black rounded-lg md:w-3/4 w-11/12 mx-auto border border-gray-700'>
                    {/* Cover Image */}
                    <img
                        src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Cover"
                        className='h-48 w-full object-cover'
                    />

                    {/* Profile Image */}
                    <img
                        src={user.profilePic}
                        className='rounded-full h-40 w-40 object-cover border-4 border-black absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                        alt="User profile"
                        style={{
                            position: 'relative',
                            top: '-0px',
                        }}
                    />

                    {/* User Details */}
                    <div className="text-center mt-4" style={{ marginTop: '-75px' }}>
                        <h1 className='text-white text-xl'>{user.name}</h1>
                        <p className='text-gray-400 text-sm'>@{user.userName}</p>
                        <p className='text-gray-400 text-sm'>{user.bio}</p>
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

                {/* Posts Section */}
                <div className='bg-black border border-gray-700 mt-6 p-6 rounded-lg md:w-3/4 w-11/12 mx-auto overflow-y-auto' style={{ height: '55vh' }}>
                    <h1 className='text-white text-2xl font-semibold mb-4'>Posts</h1>
                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id} className='bg-black text-white mt-4 p-4 rounded-lg'>
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
                                            <TrashIcon className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>

                                <h2 className='text-white text-lg mb-4'>{post.title}</h2>

                                {post.mediaUrl && (
                                    <img
                                        src={post.mediaUrl}
                                        alt={post.title}
                                        className='rounded-lg h-80 w-full object-cover'
                                    />
                                )}

                                {/* Post Action Buttons */}
                                <div className="flex justify-between mt-4">
                                    <button className='flex items-center text-gray-400 hover:text-white'>
                                        <HeartIcon className="w-6 h-6" />
                                        <p className='ml-1 text-sm'>Like</p>
                                    </button>
                                    <button className='flex items-center text-gray-400 hover:text-white'>
                                        <Share className="w-6 h-6" />
                                        <p className='ml-1 text-sm'>Share</p>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-400'>No posts available.</p>
                    )}
                </div>
            </div>

        </>
    );
}

export default UserProfile;
