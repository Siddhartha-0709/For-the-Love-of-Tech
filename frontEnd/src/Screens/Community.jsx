import React, { useEffect } from 'react'
import { CircleUserRound, Cross, Forward, HeartIcon, MessageSquareMore, Search, Share, X } from 'lucide-react';
import '../Screens/Community.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Header from './Header';
import Loader from './Loader';
function Community() {
    // Extracting data from location state
    const location = useLocation();
    const { data } = location.state || {};
    // console.log(data);
    const navigate = useNavigate();
    // State for storing random users (You May Know) and posts
    const [youMayKnow, setYouMayKnow] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    // State for form data (for creating a post)
    const [formData, setFormData] = useState({
        title: '',
        media: null,
    });
    const [loader, setLoader] = useState(false);
    // Function to fetch random users
    const getUserData = async () => {
        try {
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/info?username=${data.userName}`);
            console.log(response.data.user);
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }
    const getRandomUser = async () => {
        try {
            const response = await axios.get('https://siddharthapro.in/app3/api/v1/user/getrandomusers');
            // console.log(response.data);  
            setYouMayKnow(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to fetch posts
    const getPosts = async () => {
        try {
            const response = await axios.get('https://siddharthapro.in/app3/api/v1/post/getposts');
            // console.log(response.data);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to toggle followers
    const toggleFollowers = async (username) => {
        try {
            // console.log(data);

            console.log(data.userName, 'will follow', username);
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/user/togglefollowers?username=${username}&presentUser=${data.userName}`);
            console.log(response.data);
            // refresh the page
            getRandomUser();
            getPosts();
            getUserData();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    // Function to toggle the modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Handle change for text input in the form
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle change for file input in the form
    const handleFileChange = (e) => {
        setFormData({ ...formData, media: e.target.files[0] });
    };

    // Handle form submission for creating a post
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Preparing form data to be submitted
        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSubmit.append(key, formData[key]);
        });
        formDataToSubmit.append('author', data._id);

        try {

            // Ensure a media file is selected
            if (!formData.media) {
                alert('Please select a file');
                return;
            }
            // Add a loader
            setLoader(true);
            // Send the form data to the server
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/post/create', formDataToSubmit);
            console.log(response.data);
            alert('Post created successfully!');
            setLoader(false);
            toggleModal(); // Close the modal after successful submission
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    const sharePost = async (postId) => {
        try {
            navigator.clipboard.writeText(`https://siddharthapro.in/app3/api/v1/post/getpostbyid?id=${postId}`)
                .then(() => {
                    // If successful, show a success message
                    setCopySuccess('Text copied to clipboard!');
                })
                .catch(() => {
                    // If an error occurs
                    setCopySuccess('Failed to copy text');
                });
            alert('Share Link Copied to Clipboard!');
        }
        catch (err) {
            console.log(err);
        }
    }

    // Fetch random users and posts when the component mounts
    useEffect(() => {
        toggleFollowers();
        getRandomUser();
        getPosts();
        getUserData();
    }, []);

    return (
        <>
            <Header />
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                        <div className='grid grid-cols-2 p-4'>
                            <div>
                                <h2 className="text-2xl font-bold">Create New Post</h2>
                            </div>
                            <div className='flex justify-end'>
                                <button onClick={toggleModal}>
                                    <X size={32} color='black' />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter title here"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            />

                            <input
                                type="file"
                                name="media"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {loader ? <Loader /> : null}
            <div className='bg-gray-950 grid md:grid-cols-[1.2fr_3fr] mt-10' style={{ height: '94.5vh' }}>
                <div className='bg-gray-950 p-8 hidden md:block'>
                    <div className='bg-gray-800 rounded-3xl'>
                        {/* Cover image */}
                        <img
                            src="https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className='rounded-t-3xl w-full object-cover'
                            style={{ height: '150px' }}
                        />

                        {/* Profile picture */}
                        <div className='flex justify-center relative' style={{ top: '-50px' }}>
                            <img
                                src={user.profilePic}
                                alt=""
                                className='rounded-full'
                                style={{
                                    borderRadius: '50%',
                                    height: '90px',
                                    width: '90px',
                                    border: '3px solid white'
                                }}
                            />
                        </div>

                        {/* User info */}
                        <h1 className='text-white text-2xl text-center'>{user.name}</h1>
                        <h2 className='text-gray-400 text-md text-center'>@{user.userName}</h2>
                        <p className='text-gray-400 text-sm text-center mb-4'>{user.bio}</p>

                        {/* Follow section */}
                        <div className='flex justify-around mb-5'>
                            <div className='text-center'>
                                <h1 className='text-white text-lg'>Followers</h1>
                                <p className='text-gray-400'>{user.followers?.length || 0}</p>
                            </div>
                            <div className='text-center'>
                                <h1 className='text-white text-lg'>Following</h1>
                                <p className='text-gray-400'>{user.following?.length || 0}</p>
                            </div>
                        </div>

                        {/* Profile button */}
                        <div className='flex justify-center'>
                            <a
                                href={`/userProfile?username=${user.userName}&presentUser=${data.userName}`}
                                className='text-blue-500 hover:text-blue-300 py-2 px-6 rounded-lg mb-6 transition-colors duration-200'
                            >
                                My Profile
                            </a>
                        </div>
                    </div>

                    {/* People You May Know section */}
                    <div className='bg-gray-800 rounded-3xl mt-5 p-4'>
                        <h1 className='text-white text-lg font-semibold mb-3'>People You May Know</h1>
                        <div className='space-y-4'>
                            {youMayKnow.map((item, index) => (
                                <div key={index} className='flex items-center'>
                                    <a href={`/userProfile?username=${item.userName}&presentUser=${data.userName}`}>
                                        <img
                                            src={item.profilePic}
                                            alt=""
                                            className='rounded-full h-12 w-12 object-cover'
                                        />
                                    </a>
                                    <div className='ml-4'>
                                        <a href={`/userProfile?username=${item.userName}&presentUser=${data.userName}`}>
                                            <h1 className='text-white text-md font-semibold'>{item.name}</h1>
                                            <h2 className='text-gray-400 text-sm'>@{item.userName}</h2>
                                        </a>
                                    </div>


                                    {data.userName === item.userName ? null : (
                                        data.following?.includes(String(item._id)) ? (
                                            <button
                                                className='ml-auto text-red-500 hover:text-red-300 py-1 px-4 rounded-lg bg-gray-700 transition-colors duration-200'
                                                onClick={() => toggleFollowers(item.userName)}
                                            >
                                                Unfollow
                                            </button>
                                        ) : (
                                            <button
                                                className='ml-auto text-blue-500 hover:text-blue-300 py-1 px-4 rounded-lg bg-gray-700 transition-colors duration-200'
                                                onClick={() => toggleFollowers(item.userName)}
                                            >
                                                Follow
                                            </button>
                                        )
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='bg-gray-950 overflow-y-auto p-8 custom-scrollbar '>
                    <div className="bg-gray-800 rounded-3xl flex items-center pt-3 pb-3 pr-3 pl-3">
                        <img
                            src={data.profilePic}
                            alt=""
                            className="object-cover rounded-full w-12 h-12 ml-2 mr-2 border-2 border-white"
                        />
                        <button
                            placeholder="What's up there?"
                            className="w-full p-3 rounded-2xl bg-gray-700 text-gray-300 outline-none resize-none h-12 readonly text-left cursor pointer"
                            onClick={() => {
                                toggleModal()
                                console.log('clicked');
                            }}
                        >
                            What's up there?
                        </button>
                    </div>
                    {
                        posts.map((item, index) => (
                            <div className="bg-gray-800 rounded-3xl p-3 mb-4 mt-4" key={index}>
                                <div className="flex items-center">
                                    <img
                                        src={item.author.profilePic}
                                        alt=""
                                        className="object-cover rounded-full w-12 h-12 ml-2 mr-2 border-2 border-white"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-white font-semibold text-md mt-2">
                                            {item.author.name}
                                        </p>
                                        <p className="text-gray-400 text-sm" style={{ position: 'relative', top: '-4px' }}>
                                            @{item.author.userName}
                                        </p>
                                    </div>
                                    <div className='ml-auto'>
                                        <button className='justify-center items-center flex mr-5'
                                            onClick={() => sharePost(item._id)}>

                                            <Share color="#ffffff" />
                                            <p className='text-gray-400 text-sm ml-1'>Share</p>
                                        </button>
                                    </div>
                                </div>
                                {
                                    !item.media ? (
                                        <div className="">
                                            <p className="text-white text-md mt-2 ml-2 break-words mb-2 ">{item.title}</p>
                                            <img src={item.mediaUrl} alt="" className="rounded-xl h-80 w-full mx-auto object-cover aspect-auto" />
                                        </div>
                                    ) : (
                                        <p className="text-white text-md mt-2 ml-2 break-words mb-2 ">{item.description}</p>
                                    )
                                }
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
                    }
                </div>

            </div>
        </>
    )
}

export default Community