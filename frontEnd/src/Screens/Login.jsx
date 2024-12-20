import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Log formData to the console
        // console.log('Login Data:', formData);
        try {
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/user/login', formData);
            console.log(response.data);
            // alert('User Logged successfully!');
            navigate('/community', { state: { data: response.data } });
        } catch (error) {
            alert('Invalid Credentials or User does not exist');
        }
    };

    return (
        <>
            <Header />
            <div className='pt-10 bg-black'>
                <div className="flex flex-col sm:grid sm:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
                    {/* Left Section: Welcome Message */}
                    {/* //navigate('/community', { state: { data: response.data } }); */}
                    <div className="w-full h-full bg-black  flex items-center justify-center">
                        <div className="md:p-4 p-10 text-left">
                            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Prognostic' }}>Welcome to</h1>
                            <h1 className="text-7xl font-extrabold text-white mb-4" style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                            <p className="text-sm md:text-lg font-medium text-white opacity-90">The Community for Developers and Tech Enthusiasts</p>
                        </div>
                    </div>

                    {/* Right Section: Login Form */}
                    <div className="md:h-screen md:pl-20 md:pt-40 pb-10 md:pr-20 ml-5 mr-5 mt-5 sm:order-1 bg-black">
                        <div className="w-full">
                            <h1 className="text-4xl text-white font-bold mb-4 " style={{ fontFamily: 'Ubuntu' }}>Welcome Back</h1>
                            <p className="mb-4 w-full text-md md:text-md mt-4 text-white font-light" style={{ fontFamily: 'Ubuntu' }}>Continue your journey building your skills and network with other developers.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4 w-full">
                            {/* Email Field */}
                            <div>
                                <label className="block text-left text-gray-200 mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {/* Password Field */}
                            <div>
                                <label className="block text-left text-gray-200 mb-2 font-medium">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {/* Sign In Button */}
                            <button className="w-full h-12 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
                                Log In
                            </button>
                            {/* Sign Up Link */}
                            <p className="text-gray-300 text-left mt-6">
                                Don't have an account? <a href="/signup" className="text-indigo-400 hover:underline">Sign Up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;


