import React from 'react'
import RotateLoader from 'react-spinners/RotateLoader';
function Loader() {
    return (
        <div className="flex flex-col justify-center items-center bg-black h-screen">
            <RotateLoader
                color="#FFFFFF"
                loading
                margin={25}
                size={20}
                speedMultiplier={1}
            />
            <h1 className="text-white text-xl sm:text-3xl mt-10 text-center">Please Wait...</h1>
        </div>
    )
}

export default Loader