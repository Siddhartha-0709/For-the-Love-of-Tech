import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Trending({ data }) {
    console.log('Current User', data);
    const [searchQuery, setSearchQuery] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [trending, setTrending] = useState([]);
    // Fetch trending topics
    const getTrending = async () => {
        try {
            const response = await axios.get('https://siddharthapro.in/app3/api/v1/trending/gettopics');
            // console.log(response.data);
            setTrending(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch user profiles (assuming this endpoint exists)
    const getProfiles = async () => {
        try {
            const response = await axios.get('https://siddharthapro.in/app3/api/v1/user/getusers');
            // console.log(response.data);
            setProfiles(response.data);
            // setFilteredProfiles(response.data); // Initially show all profiles
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTrending();
        getProfiles();
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        // Filter profiles based on search query
        const filtered = profiles.filter(profile =>
            profile.name.toLowerCase().includes(query)
        );
        setFilteredProfiles(filtered);

        if (query === '') {
            setFilteredProfiles([]);
        }
    };

    return (
        <div className='bg-black p-4 md:pb-8 hidden md:block border-l border-gray-700 pt-16' style={{ position: 'sticky', top: '0', height: '100vh' }}>
            {/* Search for People */}
            <div className='bg-black mb-5 mt-5'>
                <h1 className='text-white text-lg font-semibold mb-3'>Search for People</h1>
                <input
                    type="text"
                    placeholder="Search for People"
                    className='w-full bg-black border border-gray-700 p-3 text-white rounded-3xl hover:border-gray-300'
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <div className='mt-4'>
                    {filteredProfiles.map((profile) => (
                        <div key={profile.id} className='border-b border-gray-700 pb-3 pt-3'>
                            <a href={`/userProfile?username=${profile.userName}&presentUser=${data.userName}`} target="_blank" rel="noopener noreferrer" className='text-white text-md font-medium m-8'>
                                <div className='flex flex-row items-center ml-3'>
                                    <img src={profile.profilePic} alt="" className='object-cover rounded-full w-10 h-10 sm:w-12 sm:h-12 ml-2 mr-2 border-2 border-white' />
                                    <div>
                                        <h1>{profile.name}</h1>
                                        <p className='text-white text-sm'>{profile.userName}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Topics */}
            <div className='bg-black border-t border-gray-700 p-4'>
                <h1 className='text-white text-xl font-bold mb-3'>Trending Topics</h1>
                <div className='space-y-4 overflow-y-auto max-h-[70vh] custom-scrollbar pb-5'>
                    {trending.map((data) => (
                        <div key={data.title} className='border-b border-gray-700 pb-5'>
                            <a href={data.link} target="_blank" rel="noopener noreferrer">
                                <h1 className='text-white text-lg font-semibold mb-3'>
                                    {data.title}
                                </h1>
                                <p className='text-white text-sm'>
                                    {data.description}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Trending;
