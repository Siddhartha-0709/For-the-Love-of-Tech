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
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Log formData to the console
        console.log('Login Data:', formData);
        try {
            const response =  await axios.post('https://siddharthapro.in/app3/api/v1/user/login', formData);
            console.log(response.data);
            alert('User Logged successfully!');
            navigate('/community',{state:{data:response.data}});
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen bg-gray-900 grid grid-cols-2">
                <div className='h-full bg-black items-center flex'>
                    <div className="ml-10 mb-40">
                        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Prognostic' }}>Welcome to</h1>
                        <h1 className="text-6xl font-bold text-white" style={{ fontFamily: 'Prognostic' }}>Spaces</h1>
                        <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Prognostic' }}>The Community made for Developers and Tech Enthusiasts</h1>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="w-3/4 ml-auto mr-auto">
                            <h1 className="text-5xl text-white" style={{ fontFamily: 'Prognostic' }}>Welcome Back</h1>
                            <h1 className="text-md mt-4 text-gray-300">Continue your journey in our diverse community of tech enthusiasts and developers. Log in to foster great learning experiences, connect with peers, and explore the latest in technology.</h1>
                        </div>
                        <div className="w-3/4 ml-auto mr-auto">
                            <form className="w-3/4 ml-auto mr-auto mt-8" onSubmit={handleSubmit}>
                                <label>
                                    <p className="text-white ml-2">Enter your email </p>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2 mb-4"
                                        placeholder="Enter your Email"
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
                                <button className="w-full h-12 mt-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-400 m-2">
                                    Sign In
                                </button>
                                <p className="text-white mt-4">
                                    Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Login;
