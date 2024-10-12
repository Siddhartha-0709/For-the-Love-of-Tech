import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourse = async () => {
    const response = await axios.get(`http://localhost:4000/api/v1/course/get`);
    setCourses(response.data);
  }

  useEffect(() => {
    getCourse();
  }, []);

  const CourseCard = ({ course }) => {
    return (
      <div
        className="bg-gray-800 text-white mb-4 rounded-lg p-4 flex flex-row items-center gap-4 cursor-pointer hover:bg-gray-700 transition-all duration-200 ease-in-out"
        onClick={() => navigate(`/view-course?courseId=${course.courseName}`)}
      >
        <div className="flex-shrink-0 w-1/4">
          <img
            src={course.coverImage}
            className="w-full  rounded-lg"
            alt={`Cover image of ${course.courseName}`}
          />
        </div>
        <div className="flex-grow">
          <h5 className="text-2xl font-bold mb-3">{course.courseName}</h5>
          <p className="text-lg">{course.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5 py-5 bg-gray-950 text-white h-screen">
      <h1 className="text-3xl font-bold mb-4">Explore Production Ready</h1>
      <h1 className="text-xl font-medium mb-4 text-left text-gray-400">Dive into our collection of production-ready, easy-to-understand tech courses at TechExplore. Our platform offers a unique learning experience tailored for both students and working professionals seeking to enhance their technical skills. Each course in our catalog has been carefully curated to ensure it delivers practical, industry-relevant knowledge in a clear and accessible format. Our commitment to quality content has earned us high praise from our diverse community of learners. Whether you're looking to start a new career in tech or upgrade your existing skillset, our courses provide the perfect blend of depth and clarity to help you achieve your goals. Explore our offerings today and join the ranks of satisfied professionals who have accelerated their tech careers with TechExplore.</h1>
      {courses.map(course => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseListing;

