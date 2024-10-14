import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const CourseModules = () => {
    const [modules, setModules] = useState([]);
    const [course, setCourse] = useState(null);
    const [courseName, setCourseName] = useState('');
    const getCourseModules = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            let courseName = urlParams.get('courseId'); // Fallback to a default course name
            if (courseName == 'Object Oriented Programming with C  ') {
                console.log('Hit here');

                courseName = 'Object Oriented Programming with C++';
            }
            console.log(courseName);
            setCourseName(courseName);
            const response = await axios.get(`https://siddharthapro.in/app3/api/v1/video/getbycourse/${encodeURIComponent(courseName)}`);
            console.log(`https://siddharthapro.in/app3/api/v1/video/getbycourse/${encodeURIComponent(courseName)}`);
            console.log(response.data);
            setModules(response.data.videos);
            setCourse(response.data.course);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCourseModules();
    }, []);

    return (
        <div className="w-full bg-gray-950 mx-auto">
            <Header />
            <div className="container px-4 md:px-6 mx-auto mt-16 pt-10">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                            {courseName}
                        </h1>
                        <p className="mt-4 text-gray-400 text-lg md:text-xl">
                            {course?.description}
                        </p>
                    </div>
                    <img
                        src={course?.coverImage}
                        width="600"
                        height="500"
                        alt="Course Thumbnail"
                        className="rounded-lg"
                    />
                </div>
                <div className="container px-4 md:px-6 py-12 md:py-20 lg:py-24 bg-gray-950 dark">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-white">Course Modules</h2>
                    <div className="">
                        {modules.length > 0 ? (
                            modules.map((module) => (
                                <CourseModule
                                    key={module._id}
                                    title={module.title}
                                    description={module.description || "No description available."}
                                    duration={`${Math.floor(module.duration / 60)} mins ${module.duration % 60} secs`}
                                    imgSrc={module.thumbnailLink}
                                    videoUrl={module.youtubeUrl}
                                />
                            ))
                        ) : (
                            <h1 className="text-2xl font-bold text-gray-400">We are working tirelessly to bring this exciting series live for you.</h1>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

const CourseModule = ({ title, description, duration, imgSrc, videoUrl }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg m-2">
            <div className="flex">
                <div className="aspect-video p-4">
                    <img
                        alt="Module Thumbnail"
                        height="225"
                        className="rounded-lg object-cover"
                        src={imgSrc}
                        width="400"
                        style={{ aspectRatio: '400 / 225', objectFit: 'cover' }}
                    />
                </div>
                <div className="p-4 flex-1">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-gray-400 mt-2">{description}</p>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-400">{duration}</span>
                        <button
                            className="bg-gray-50 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-9 rounded-md px-3 hover:bg-orange-400 hover:text-white"
                            onClick={() => navigate(`/video?src=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}&img=${encodeURIComponent(imgSrc)}`)}
                        >
                            Watch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseModules;
