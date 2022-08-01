import React from 'react'
import {Link} from 'react-router-dom';

export function ButtonHome() {
  return (
    <div className=" content-center bg-gray-500 hover:bg-blue-700 text-white font-bold rounded w-fit p-3 m-4">
        <Link to="/">Home</Link>
    </div>
  )
}
