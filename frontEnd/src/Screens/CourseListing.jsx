import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourse = async () => {
    const response = await axios.get(`https://siddharthapro.in/app3/api/v1/course/get`);
    setCourses(response.data);
  }

  useEffect(() => {
    getCourse();
  }, []);

  const CourseCard = ({ course }) => {
    return (
      <div
        className="bg-gray-950 text-white mb-4 rounded-lg p-4 flex flex-col sm:flex-row items-center sm:gap-4 gap-2 cursor-pointer hover:bg-gray-700 transition-all duration-200 ease-in-out"
        onClick={() => navigate(`/view-course?courseId=${course.courseName}`)}
      >
        <div className="md:w-1/2">
          <img
            src={course.coverImage}
            className="w-full rounded-lg"
            alt={`Cover image of ${course.courseName}`}
          />
        </div>
        <div className="w-full sm:flex-grow mt-4 sm:mt-0">
          <h5 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ fontFamily: 'Ubuntu' }}>{course.courseName}</h5>
          <p className="text-base sm:text-lg" style={{ fontFamily: 'Ubuntu' }}>
            {window.innerWidth <= 640
              ? course.description.split(' ').slice(0, 50).join(' ') + '...'
              : course.description.substr(0, 920) + (course.description.length > 920 ? '...' : '')}
          </p>
        </div>
      </div>


    );
  };

  return (
    <>
      <Header />
      <div className="md:p-8 py-2 md:py-5 bg-black text-white h-full mt-10">
        <div className='item-center flex mt-10'>
          <h1 className="text-3xl font-semibold mb-4 md:mb-4 md:text-5xl md:font-bold text-left bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-transparent" style={{ WebkitTextStroke: '0px black', fontFamily: 'Ubuntu' }}>Upgrade your Tech Potential</h1>
        </div>
        <h1 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Ubuntu' }}>Explore Production Ready, Highly Curated Courses</h1>
        <h1 className="text-xl font-light mb-4 text-left text-gray-400" style={{ fontFamily: 'Ubuntu' }}>Dive into our collection of production-ready, easy-to-understand tech courses at Spaces. Our platform offers a unique learning experience tailored for both students and working professionals seeking to enhance their technical skills. Each course in our catalog has been carefully curated to ensure it delivers practical, industry-relevant knowledge in a clear and accessible format.<br/> <br /> Our commitment to quality content has earned us high praise from our diverse community of learners. Whether you're looking to start a new career in tech or upgrade your existing skillset, our courses provide the perfect blend of depth and clarity to help you achieve your goals. Explore our offerings today and join the ranks of satisfied professionals who have accelerated their tech careers with Spaces.</h1>
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default CourseListing;

