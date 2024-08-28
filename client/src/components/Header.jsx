import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='h-28 w-full bg-white'>
        <div className="logo h-full flex items-center pl-10  ">
            <Link to={"/"}>
              <img 
                  src="../../public/Ddsgnr Library.png" 
                  alt="" 
                  className='h-1/3'
              />
            </Link>
        </div>
    </div>
  )
}

export default Header