import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-10 bg-black border-b border-gray-800" >
            <div className="flex items-center justify-between px-2 py-2 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center text-gray-50">
                    <h1
                        className="text-3xl relative top-0 w-fit h-auto py-1 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text md:text-4xl font-extrabold text-transparent text-center select-auto"
                        style={{ fontFamily: 'Prognostic', fontWeight: '400' }}
                    >
                        Spaces
                    </h1>
                    <p className="text-gray-50 text-sm" style={{ position: 'relative', fontFamily: 'Prognostic', fontWeight: '300', marginTop: 20, marginRight:10 }}>for developers</p>
                </Link>
                <Link
                    className=" inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 border-1 px-4 md:px-8 text-sm font-medium text-white shadow transition-colors hover:from-green-500 hover:via-blue-500 hover:to-teal-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
                    to="/signup"
                    style={{ position: 'absolute', right: 10, top: 10 }}
                >
                    Join Community
                </Link>
               
            </div>
            <div className="flex flex-row items-center justify-center">
                {/* <iframe src="https://lottie.host/embed/ea6378f3-354b-4914-ae55-537b446bc181/eti0rlMahU.json"
            style={{ zIndex: 2, top: -72, position: 'absolute', transform: 'translateX(-50%)', width: '50%' }} className=""
          ></iframe>
          <iframe src="https://lottie.host/embed/ea6378f3-354b-4914-ae55-537b446bc181/eti0rlMahU.json"
            style={{ zIndex: 2, top: -72, position: 'absolute', transform: 'translateX(50%)', width: '50%' }} className=""
          ></iframe> */}
            </div>
        </header>
    )
}

export default Header