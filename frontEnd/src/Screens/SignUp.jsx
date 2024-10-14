import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { Navigate, useNavigate } from 'react-router-dom';
function SignUp() {
    const navigate = useNavigate();
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page refresh
        console.log(formData);  // Log form data to console
        try {
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/user/signup', formData);
            console.log(response.data);
            alert('User created successfully!');
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="pt-10 bg-gray-100 min-h-screen">
                <div className="flex flex-col items-center sm:grid sm:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Left Section: Welcome Text */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                        <div className="p-4 text-center sm:text-left">
                            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Prognostic' }}>Welcome to</h1>
                            <h1 className="text-7xl font-extrabold text-white mb-4" style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                            <p className="text-lg font-medium text-white opacity-90">The Community for Developers and Tech Enthusiasts</p>
                        </div>
                    </div>
                    {/* Right Section: Sign Up Form */}
                    <div className="p-4 sm:p-16 sm:order-1 bg-gray-900">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Prognostic' }}>Hello There</h1>
                            <p className="text-md mt-4 text-white" style={{ fontFamily: '' }}>Join our community of tech enthusiasts and developers.</p>
                        </div>
                        <div className="w-full">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Name Field */}
                                <div>
                                    <label className="block text-left text-white font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {/* Username Field */}
                                <div>
                                    <label className="block text-left text-white font-medium">Username</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Choose a username"
                                    />
                                </div>
                                {/* Email Field */}
                                <div>
                                    <label className="block text-left text-white font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {/* Password Field */}
                                <div>
                                    <label className="block text-left text-white font-medium">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Create a password"
                                    />
                                </div>
                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-left text-white font-medium">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Confirm your password"
                                    />
                                </div>
                                {/* Submit Button */}
                                <button className="w-full h-12 mt-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
                                    Sign Up
                                </button>
                                {/* Already Have an Account */}
                                <p className="text-gray-300 mt-6">
                                    Already have an account? <a href="/login" className="text-indigo-500 hover:underline">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />


        </>
    );
}

export default SignUp;
