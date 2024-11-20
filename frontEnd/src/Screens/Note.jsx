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