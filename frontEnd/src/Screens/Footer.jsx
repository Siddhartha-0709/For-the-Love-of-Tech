import React from 'react'
import sign from "../assets/sign.png";

function Footer() {
  return (
    <footer className="bg-black h-24 items-center justify-center border-t pb-10">
        <div className="flex flex-row items-center justify-center mx-auto pt-4">
          <p className="text-center text-gray-400">
            © 2024 Spaces for Developers. All rights reserved.
          </p>
        </div>
        <img src={sign} className="h-10 ml-auto mr-4" alt="" srcset="" />
      </footer>
  )
}

export default Footer