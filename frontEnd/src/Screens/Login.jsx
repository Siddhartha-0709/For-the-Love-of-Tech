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
        console.log('Login Data:', formData);
        try {
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/user/login', formData);
            console.log(response.data);
            alert('User Logged successfully!');
            navigate('/community', { state: { data: response.data } });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-900">
                {/* Left Section: Welcome Message */}
                <div className="md:w-1/2 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                    <div className="ml-6 md:ml-10 mb-10 md:mb-40 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white" style={{ fontFamily: 'Prognostic' }}>Welcome to</h1>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4" style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                        <h1 className="text-lg md:text-xl font-medium text-white opacity-90" style={{ fontFamily: '' }}>
                            The Community for Developers and Tech Enthusiasts
                        </h1>
                    </div>
                </div>

                {/* Right Section: Login Form */}
                <div className="md:w-1/2 w-full h-full flex items-center justify-center">
                    <div className="w-full md:w-3/4 px-6 md:px-0">
                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl text-white font-bold text-center md:text-left mb-6" style={{ fontFamily: 'Prognostic' }}>Welcome Back</h1>
                        <p className="text-sm md:text-md text-gray-300 text-center md:text-left mb-8">
                            Continue your journey with our diverse community. Log in to connect, share knowledge, and explore the latest in tech.
                        </p>
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                Sign In
                            </button>
                            {/* Sign Up Link */}
                            <p className="text-gray-300 text-center mt-6">
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
