import React, { useEffect } from 'react'
import { CircleUserRound, Cross, Forward, HeartIcon, MessageSquareMore, Search, Share, X } from 'lucide-react';
import '../Screens/Community.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
function Community() {
    // Extracting data from location state
    const location = useLocation();
    const { data } = location.state || {};
    // console.log(data);

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
            window.location.reload();
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

            // Send the form data to the server
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/post/create', formDataToSubmit);
            console.log(response.data);
            alert('Post created successfully!');
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
        getRandomUser();
        getPosts();
        getUserData();
    }, []);

    return (
        <>
            <header className="px-4 lg:px-0 h-12 flex items-center bg-black grid grid-cols-2  ">
                <div>
                    <h1 className='text-3xl font-bold text-white ml-10' style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                </div>
            </header>

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

            <div className='bg-gray-950 grid grid-cols-[1.2fr_3fr]' style={{ height: '93.5vh' }}>
                <div className='bg-gray-950 p-8'>
                    <div className='bg-gray-800 rounded-3xl'>
                        <img src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" srcSet="" className='rounded-t-3xl h-1/3 w-full object-cover' style={{ height: '100px' }} />
                        <img src={user.profilePic} alt="" srcSet="" className='' style={{ borderRadius: '50px', height: '90px', width: '90px', border: '2px solid white', position: 'relative', top: '-45px', left: '135px' }} />
                        <h1 className='text-white text-xl text-center' style={{ position: 'relative', top: '-40px' }}>{user.name}</h1>
                        <h1 className='text-gray-400 text-md text-center' style={{ position: 'relative', top: '-40px' }}>@{user.userName}</h1>
                        <h1 className='text-gray-400 text-md text-center' style={{ position: 'relative', top: '-40px' }}>{user.bio}</h1>
                        <div className='grid grid-cols-2 ' style={{ position: 'relative', top: '-30px' }}>
                            <div className='flex justify-center '>
                                <div>
                                    {/* <h1 className='text-white text-lg text-center'>{user.followers.length}</h1> */}
                                    {/* <h1 className='text-gray-400 text-lg text-center'>Followers</h1> */}
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div>
                                    {/* <h1 className='text-white text-lg text-center'>{user.following.length}</h1> */}
                                    {/* <h1 className='text-gray-400 text-lg text-center'>Following</h1> */}
                                </div>
                            </div>
                        </div>
                        <button className='text-blue-500 hover:text-blue-200 h-5 w-40 rounded-lg text-center font-semibold'
                            style={{ position: 'relative', top: '-20px', left: '100px', marginBottom: '5px' }}>
                            {/* Embedding the username and presentUser as query parameters */}
                            <a href={`/userProfile?username=${data.userName}&presentUser=${data.userName}`}>My Profile</a>
                        </button>

                    </div>
                    <div className='bg-gray-800 rounded-3xl mt-5'>
                        <h1 className='text-white text-lg font-semibold text-left pt-3 pl-3'>People You May Know</h1>
                        <div className='pl-3 pr-3 pb-3'>
                            {
                                youMayKnow.map((item, index) => (
                                    <div key={index} className='flex mt-3'>
                                            <a href={`/userProfile?username=${item.userName}&presentUser=${data.userName}`}>
                                                <img src={item.profilePic} alt="" srcSet="" className='rounded-3xl h-12 w-12' />
                                            </a>
                                        <div>
                                            <a href={`/userProfile?username=${item.userName}&presentUser=${data.userName}`}>
                                                <h1 className='text-white text-lg font-semibold ml-3'>{item.name}</h1>
                                                <h1 className='text-gray-400  text-o900sm ml-3' style={{ position: 'relative', top: '-5px' }}>@{item.userName}</h1>
                                            </a>
                                        </div>
                                        <button className='w-20 ml-auto text-blue-500 hover:text-blue-200 h-5 rounded-lg text-center mt-2 font-semibold text-sm'
                                        onClick={() => toggleFollowers(item.userName)}>
                                            <h1>Follow</h1>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='bg-gray-950 overflow-y-auto p-8 custom-scrollbar'>
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