import { Link, useNavigate } from "react-router-dom";
import dp from "../assets/CC Me Export. with BGpng2.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import logo from "../assets/flt.png";
import cover from "../assets/cover.png";
import banner from "../assets/Cover-2.png";
function HomePage() {
  const [recentCourses, getRecentCourses] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const getRecent = async () => {
    try {
      setLoader(true);
      const response = await axios.get('https://siddharthapro.in/app3/api/v1/course/get-recent');
      console.log(response.data);
      getRecentCourses(response.data);
      setLoader(false);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRecent();
  }, []);
  return (
    <div className="flex flex-col min-h-[100vh] bg-gray-950 text-gray-50">
      <header className="bg-black">
        <div className="flex items-center justify-between px-2 py-2 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center text-gray-50">
          <h1
        class="relative top-0 w-fit h-auto py-1 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent text-center select-auto" 
        style={{ fontFamily: 'Prognostic', fontWeight: '400' }}
        >
        Spaces
    </h1>
        <p style={{position: 'relative', left: '0', top: '10  ', fontFamily: 'Prognostic', fontWeight: '300', marginTop:20}}>for developers</p>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-5 mx-auto">
          <div className="container px-2 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_600px] py-10">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-pink-200 animate-gradient-x">
                    Ignite Your Tech Potential
                  </h1>
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
                    Production Ready Tutorials
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                  Where code meets creativity, and innovation knows no bounds.Master cutting-edge skills with production-ready courses. Collaborate in a thriving community of tech trailblazers. Transform ideas into reality, from concept to deployment.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-1 px-8 text-sm font-medium text-white shadow transition-colors hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
                    to="/courses"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 border-1 px-8 text-sm font-medium text-white shadow transition-colors hover:from-green-500 hover:via-blue-500 hover:to-teal-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
                    to="/community"
                  >
                    Join Community
                  </Link>
                </div>
              </div>
              <img
                src={dp}
                alt="Hero"
                className="w-3/4 max-w-lg rounded-full shadow-2xl"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-4 sm:py-24 lg:py-4 bg-black">
          <img src={banner} alt="" style={{ width: '70%', marginLeft:'auto', marginRight:'auto', marginTop:50, borderRadius:20 }} />
          <h1 className="text-6xl font-bold text-center mb-4 mt-16 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-transparent" style={{ WebkitTextStroke: '0px black' }}>Home for The Tech Lovers</h1>
          <p className="text-center text-3xl font-medium bg-clip-text mb-6 mt-2 ml-10 mr-10 md:ml-20 md:mr-20">Idiate | Initiate | Innovate</p>
          <p className="text-center text-xl font-light text-gray-400 mb-12 ml-10 mr-10 md:ml-20 md:mr-20">
            Welcome to the ultimate destination for tech enthusiasts of all levels. Our community is a vibrant hub of highly motivated, and passionate individuals who are constantly seeking the cutting edge of technology. Whether you're taking your first steps into the world of tech or you're a seasoned professional looking to expand your horizons, our platform has something for everyone.<br /><br />
            We offer engaging discussions on the latest innovations, hands-on workshops to develop practical skills, expert talks from industry leaders, and a supportive network of like-minded individuals.
          </p>
          <nav className="px-4 md:px-6 flex flex-wrap justify-center">
            <button className="px-4 bg-white m-4 w-40 h-10 text-black rounded-lg hover:bg-orange-400 hover:text-white transition-colors duration-300"
              onClick={() => navigate('/courses')}
            >
              <h1>Courses</h1>
            </button>
            <a href="https://whatsapp.com/channel/0029VagqJpP9xVJcH9jVYL2M">
              <button className="px-4 bg-white m-4 w-40 h-10 text-black rounded-lg hover:bg-orange-400 hover:text-white transition-colors duration-300">
                <h1>Join WhatsApp</h1>
              </button>
            </a>
            <a href="https://github.com/Siddhartha-0709">
              <button className="px-4 bg-white m-4 w-40 h-10 text-black rounded-lg hover:bg-orange-400 hover:text-white transition-colors duration-300">
                <h1>GitHub</h1>
              </button>
            </a>
            <a href="https://www.youtube.com/@siddharthadotcom">
              <button className="px-4 bg-white m-4 w-40 h-10 text-black rounded-lg hover:bg-orange-400 hover:text-white transition-colors duration-300">
                <h1>YouTube</h1>
              </button>
            </a>
            <a href="http://blogs.siddharthapro.in/">
              <button className="px-4 bg-white m-4 w-40 h-10 text-black rounded-lg hover:bg-orange-400 hover:text-white transition-colors duration-300">
                <h1>Blogs</h1>
              </button>
            </a>
            <hr className="my-4 mb-10" style={{ borderWidth: 2, width: '100%' }} />
          </nav>
          <div className="px-6 md:px-6">
            {loader ? (<div className="mt-10 flex justify-center pb-10 pt-10">
              <Loader />
            </div>)
              : (<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-4 justify-center items-center">
                {recentCourses.map((course) => (
                  <button className="rounded-lg bg-gray-950 p-6 shadow-sm" key={course._id} onClick={() => navigate(`/view-course?courseId=${course.courseName}`)}>
                    <img
                      src={course.coverImage}
                      width="600"
                      alt="Course Image"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                    />
                    <div className="mt-4 space-y-2">
                      <h3 className="text-xl font-bold text-left">{course.courseName}</h3>
                      <p className="text-gray-400 text-left">{course.description.substr(0, 200)}...</p>
                    </div>
                  </button>
                ))}
              </div>)}
          </div>
        </section>
        <section className="w-full py-12 sm:py-24 lg:py-32 mx-auto">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h2>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    Our goal is to build a community of developers who are passionate about coding and building cool stuff. We believe that a lot can be achieved when great minds work together and our discord is like a coding hostel for developers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-8 text-sm font-medium text-gray-950 shadow transition-colors hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/90 dark:focus-visible:ring-gray-700"
                    href="/signup"
                  >
                    Explore Community
                  </a>
                </div>
              </div>
              <img
                src={cover}
                width="550"
                height="310"
                alt="About Us"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black h-12 flex items-center justify-center">
        <div>
          <p className="text-center text-gray-400">
            © 2024 Spaces for Developers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
