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
        if(formData.password !== formData.confirmPassword){
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('https://siddharthapro.in/app3/api/v1/user/signup', formData);
            console.log(response.data);
            alert('User created successfully!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <Header />
            <div className="pt-10 bg-black min-h-screen">
                <div className="flex flex-col sm:grid sm:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
                    {/* Left Section: Welcome Text */}
                    <div className="w-full h-full bg-gradient-to-br from-black to-violet-950 flex items-center justify-center">
                        <div className="md:p-4 p-10 text-left">
                            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Prognostic' }}>Welcome to</h1>
                            <h1 className="text-7xl font-extrabold text-white mb-4" style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                            <p className="text-sm md:text-lg font-medium text-white opacity-90">The Community for Developers and Tech Enthusiasts</p>
                        </div>
                    </div>
                    {/* Right Section: Sign Up Form */}
                    <div className="pl-20 pt-20 pb-10 pr-20 ml-5 mr-5 mt-5 sm:order-1 bg-black">
                        <div className="w-full">
                            <h1 className="text-4xl text-white font-bold mb-4  " style={{ fontFamily: 'Ubuntu' }}>Get Started</h1>
                            <p className="mb-4 w-full text-md md:text-md mt-4 text-white font-light" style={{ fontFamily: 'Ubuntu' }}>Let's get started with building your skills and network with other developers.</p>
                        </div>
                        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div>
                                <label className="block text-left text-white font-medium" style={{ fontFamily: 'Ubuntu' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your full name"
                                    style={{ fontFamily: 'Ubuntu' }}
                                />
                            </div>
                            {/* Username Field */}
                            <div>
                                <label className="block text-left text-white font-medium"
                                style={{ fontFamily: 'Ubuntu' }} >Username</label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Choose a username"
                                    style={{ fontFamily: 'Ubuntu' }} 
                                />
                            </div>
                            {/* Email Field */}
                            <div>
                                <label className="block text-left text-white font-medium"
                                style={{ fontFamily: 'Ubuntu' }} >Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your email"
                                    style={{ fontFamily: 'Ubuntu' }} 
                                />
                            </div>
                            {/* Password Field */}
                            <div>
                                <label className="block text-left text-white font-medium"
                                style={{ fontFamily: 'Ubuntu' }} >Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Create a password"
                                    style={{ fontFamily: 'Ubuntu' }} 
                                />
                            </div>
                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-left text-white font-medium"
                                style={{ fontFamily: 'Ubuntu' }} >Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Confirm your password"
                                    style={{ fontFamily: 'Ubuntu' }} 
                                />
                            </div>
                            {/* Submit Button */}
                            <br />
                            <button className="w-full h-12 mt-10 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
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
            <Footer />


        </>
    );
}

export default SignUp;
