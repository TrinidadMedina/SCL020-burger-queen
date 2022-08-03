import React from 'react'
import { Link } from 'react-router-dom'

export function Login() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
    <form className="h-2/5 w-2/5 bg-white flex flex-col m-3 shadow-lg rounded-lg p-4 items-center">
        <h1 className='font-bold p-4 text-xl'>Cafetería</h1>
        <div className='grid grid-cols-2 gap-4 p-7'>
            <label className='mx-16' for="email">Email: </label>
            <input type="email" placeholder="Your email"/>
            <label className='mx-16' for="password">Password: </label>
            <input type="password" placeholder="Your password"/>
        </div>
        <div className=" text-center bg-gray-500 hover:bg-blue-700 text-white font-bold rounded w-2/5 p-3 m-4">
            <Link to="/Diner">Enter</Link>
        </div>
    </form>
    </div>
  )
}
