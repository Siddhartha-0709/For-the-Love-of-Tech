import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './Screens/HomePage';
import CoursePage from './Screens/VideoPage';
import CourseModules from './Screens/CourseModule';
import CourseListing from './Screens/CourseListing';
import VideoPlayer from './Screens/VideoPlayer';
import Upload from './Screens/Upload';
import UpdateCourse from './Screens/UpdateCourse';
import logo from './assets/flt.png';
import Community from './Screens/Community';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import UserProfile from './Screens/UserProfile';
function App() {
  return (
    <Router>
      <div>
        <header className="px-4 lg:px-0 h-12 flex items-center bg-black hidden ">
        <Link className="flex items-center justify-center ml-3" to="/">
          {/* <img src={logo} alt="" srcset="" className='h-10 rounded-full' /> */}
          <h1 style={{ fontFamily: 'Prognostic' }} className=''>For The Love of Tech</h1>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-m text-white font-medium hover:underline underline-offset-4" to="/courses">
            Courses
          </Link>
          <Link className="text-m text-white font-medium hover:underline underline-offset-4" href="#">
            About Us
          </Link>
          <Link className="text-m text-white font-medium hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
          <Link className="text-m text-white font-medium hover:bg-gray-50 underline-offset-4" href="#">
            <button type="button" className='bg-gray-50 px-10 h-12 py-4 text-gray-950 hover:bg-gray-50/90'>
              Chat with Us
            </button>
          </Link>
        </nav>
      </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video" element={<CoursePage />} />
          <Route path="/view-course" element={<CourseModules />} />
          <Route path="/courses" element={<CourseListing />} />
          <Route path="/video" element={<VideoPlayer />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/update-course" element={<UpdateCourse />} />
          <Route path="/community" element={<Community />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
          {/* <Route path="/modal" element={<CommunityModal />} /> */}

        </Routes>
      </div>
      {/* <footer className="bg-black flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-m text-gray-400">© 2024 For The Love of Tech. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-white text-m hover:underline underline-offset-4" href="#">
            Courses
          </Link>
          <Link className="text-white text-m hover:underline underline-offset-4" href="#">
            About Us
          </Link>
          <Link className="text-white text-m hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
        </nav>
      </footer> */}
    </Router>

  );
}

export default App;
