import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { UserAuth } from '../context/AuthContext';

export function ButtonSignOut() {
  let navigate = useNavigate();
  const { out } = UserAuth();

  const handleOut = async () => {
    try {
      await out();
      navigate('/');
    } catch (error) {
      console.log('error signout', error);
    }
  }

  return (
    <button onClick={handleOut} className="bg-[#3D5552]  hover:bg-[#A46E4F] content-center  text-white font-bold rounded w-fit p-3 m-4">
      Salir
    </button>
  )
}