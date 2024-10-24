import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader';

function Loader2() {
  return (
    <div className="flex flex-col justify-center items-center py-12 px-10">
            <SyncLoader
                color="#FFFFFF"
                loading
                size={16}
                speedMultiplier={1}
            />
            <p className='text-white text-lg pt-5'>Uploading...</p>
        </div>
  )
}

export default Loader2