import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export function ButtonSignOut() {
  let navigate = useNavigate();


  const out = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log('error signout', error);
    }
  };

  return (
    <button onClick={out}className=" content-center bg-gray-500 hover:bg-blue-700 text-white font-bold rounded w-fit p-3 m-4">
      Salir
    </button>
  )
}