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
        </Routes>
      </div>
    </Router>

  );
}

export default App;
