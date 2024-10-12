import React, { useState } from 'react';
import axios from 'axios';
function SignUp() {
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
            const response =  await axios.post('https://siddharthapro.in/app3/api/v1/user/signup', formData);
            console.log(response.data);
            alert('User created successfully!');
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <header className="px-4 lg:px-0 h-12 flex items-center bg-black grid grid-cols-2">
                <div>
                    <h1 className="text-3xl font-bold text-white ml-10" style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                </div>
            </header>
            <div className="flex justify-center items-center h-screen bg-gray-900 grid grid-cols-2">
                <div className="h-full bg-black items-center flex">
                    <div className="ml-10 mb-40">
                        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Prognostic' }}>Welcome to</h1>
                        <h1 className="text-6xl font-bold text-white" style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                        <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Prognostic' }}>The Community made for Developers and Tech Enthusiasts</h1>
                    </div>
                </div>
                <div>
                    <div className="w-3/4 ml-auto mr-auto">
                        <h1 className="text-5xl text-white" style={{ fontFamily: 'Prognostic' }}>Sign Up</h1>
                        <h1 className="text-md mt-4 text-gray-300">Begin your journey to the diverse community of tech enthusiasts and developers. Foster a great learning experience by connecting with like-minded individuals, sharing knowledge, and exploring the latest in technology.</h1>
                    </div>
                    <div className="w-3/4 ml-auto mr-auto">
                        <form className="w-3/4 ml-auto mr-auto mt-8" onSubmit={handleSubmit}>
                            <label>
                                <p className="text-white ml-2">Enter your name</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2 mb-4"
                                    placeholder="Enter your name"
                                />
                            </label>
                            <label>
                                <p className="text-white ml-2">Enter your username</p>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2 mb-4"
                                    placeholder="Enter your username"
                                />
                            </label>
                            <label>
                                <p className="text-white ml-2">Enter your email</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2 mb-4"
                                    placeholder="Enter your email"
                                />
                            </label>
                            <label>
                                <p className="text-white ml-2">Enter your password</p>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2 mb-4"
                                    placeholder="Enter your password"
                                />
                            </label>
                            <label>
                                <p className="text-white ml-2">Confirm your password</p>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2 mb-4"
                                    placeholder="Confirm your password"
                                />
                            </label>
                            <button className="w-full h-12 mt-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-400 m-2">
                                Sign Up
                            </button>
                            <p className="text-white mt-4">
                                Already have an account? <a href="/login" className="text-blue-500">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
