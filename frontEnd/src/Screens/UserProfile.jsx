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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8">
                            <div className="mb-4 grid grid-cols-2 pl-10"> {/* Corrected to 'pl-10' */}
                                <div>
                                    <h2 className="text-2xl font-bold">Edit your Profile</h2>
                                </div>
                                <div className='flex justify-end'>
                                    <button onClick={toggleModal}>
                                        <X size={32} color='black' /> {/* Ensure X is properly imported */}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* Removed method="post" */}
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Edit your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            onChange={(e) => setCurrentUserData({ ...currentUserData, name: e.target.value })}
                                            placeholder={currentUserData.name}
                                            className="mt-1 block h-8 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Edit your bio</label>
                                        <input
                                            type="text"
                                            name="bio"
                                            id="bio"
                                            onChange={(e) => setCurrentUserData({ ...currentUserData, bio: e.target.value })}
                                            placeholder={currentUserData.bio}
                                            className="mt-1 block h-8 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">Upload your profile picture</label>
                                        <input
                                            type="file"
                                            name="profilePic"
                                            id="profilePic"
                                            accept="image/*" /* Added file type validation */
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <Header />
            <div className="flex flex-col pt-8 md:p-8 bg-gray-900 mt-10">
                <div className='bg-gray-800 rounded-2xl md:w-3/4 w-11/12 mx-auto'>
                    <img
                        src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Cover"
                        className='rounded-t-3xl h-1/3 w-full object-cover'
                        style={{ height: '100px' }}
                    />

                    <img
                        src={user.profilePic}
                        alt="User profile"
                        style={{
                            borderRadius: '50px',
                            height: '90px',
                            width: '90px',
                            border: '2px solid white',
                            position: 'relative',
                            top: '-45px',
                            left: 'calc(50% - 45px)',
                        }}
                    />

                    <h1 className='text-white text-xl text-center' style={{ position: 'relative', top: '-40px' }}>{user.name}</h1>
                    <h1 className='text-gray-400 text-md text-center' style={{ position: 'relative', top: '-40px' }}>@{user.userName}</h1>
                    <h1 className='text-gray-400 text-md text-center' style={{ position: 'relative', top: '-40px' }}>{user.bio}</h1>

                    <div className='grid grid-cols-2' style={{ position: 'relative', top: '-30px' }}>
                        <div className='flex justify-center'>
                            <div>
                                <h1 className='text-white text-lg text-center'>{user.following.length}</h1>
                                <h1 className='text-gray-400 text-lg text-center'>Following</h1>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div>
                                <h1 className='text-white text-lg text-center'>{user.followers.length}</h1>
                                <h1 className='text-gray-400 text-lg text-center'>Followers</h1>
                            </div>
                        </div>
                    </div>

                    <div className='justify-center items-center flex pb-4'>

                        {currentUserData.name === user.name ? (<button className='text-blue-500 hover:text-blue-200 h-5 w-40 rounded-lg text-center font-semibold' onClick={toggleModal}>
                            Edit Profile
                        </button>) : (currentUserData.following.includes(String(user._id)) ? (<button className='text-red-500 hover:text-blue-200 h-5 w-40 rounded-lg text-center font-semibold' onClick={() => toggleFollowers(username)}>
                            Unfollow
                        </button>) : (<button className='text-blue-500 hover:text-blue-200 h-5 w-40 rounded-lg text-center font-semibold' onClick={() => toggleFollowers(username)}>
                            Follow
                        </button>))
                        }


                    </div>
                </div>

                <div className='bg-gray-800 mt-5 p-4 rounded-2xl md:w-3/4 w-11/12 mx-auto overflow-y-auto custom-scrollbar' style={{ height: '55vh' }}>
                    <h1 className='text-white text-2xl font-semibold'>Posts</h1>
                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id} className='bg-gray-900 text-white mt-2 flex flex-col rounded-xl p-4'>
                                <div className="flex items-center">
                                    <img
                                        src={userData.user.profilePic}
                                        alt=""
                                        className="object-cover rounded-full w-12 h-12 ml-2 mr-2 border-2 border-white"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-white font-semibold text-md mt-2">
                                            {userData.user.name}
                                        </p>
                                        <p className="text-gray-400 text-sm" style={{ position: 'relative', top: '-4px' }}>
                                            @{userData.user.userName}
                                        </p>
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
                                <h2 className='mb-2 mt-2 text-md'>{post.title}</h2>
                                {post.mediaUrl && (
                                    <img
                                        src={post.mediaUrl}
                                        alt={post.title}
                                        className='rounded-xl h-80 w-full mx-auto object-cover aspect-auto'
                                    />
                                )}
                                <div className="mt-4 grid grid-cols-2 hidden block">
                                    <button className='justify-center items-center flex'>
                                        <HeartIcon className="w-6 h-6" color='#ffffff' />
                                        <p className='text-gray-400 text-sm ml-1'>Like</p>
                                    </button>
                                    {/* <button className='justify-center items-center flex border-l border-r'>
                                        <MessageSquareMore color="#ffffff" />
                                        <p className='text-gray-400 text-sm ml-1'>Comments</p>
                                    </button> */}
                                    <button className='justify-center items-center flex'>
                                        <Share color="#ffffff" />
                                        <p className='text-gray-400 text-sm ml-1'>Share</p>
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
