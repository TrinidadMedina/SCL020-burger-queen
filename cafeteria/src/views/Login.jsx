import React, {useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
  } from 'firebase/auth';
  import { auth, provider } from '../firebase/config';


  // Observer
/* const validateState = (next, pathname) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(pathname);
      } else {
        next('/');
      }
    });
  }; */
  // Sign in with email and password, la persona ya existe
/* const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return user;
    } catch (error) {
      throw error.code;
    }
  };

  await updateProfile(auth.currentUser, {
    displayName: userName,
  }); */

export function Login() {
  let navigate = useNavigate();
  const {input, setInput} = useState("")

  const handleSubmit =async ()=>{
    e.preventDefault();
    console.log(event.target.value)
    //navigate('/Inicio')
  }

  console.log(input)
/*     form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = container.querySelector('#email').value;
        const password = container.querySelector('#password').value;
    
        try {
          const user = await login(email, password);
          localStorage.setItem('userName', user.user.displayName);
          localStorage.setItem('userUid', user.user.uid);
          localStorage.setItem('userPhoto', user.user.photoURL);
          form.reset();
          navigate('/home');
        } catch (error) {
          if (error === 'auth/invalid-email') {
            alert('Ingresa un correo válido: ejemplo@hotmail.com');
          } else if (error === 'auth/missing-email') {
            alert('Debes ingresar un correo');
          } else if (error === 'auth/internal-error') {
            alert('Debes llenar todos los campos');
          } else if (error === 'auth/wrong-password') {
            alert('Contraseña incorrecta');
          } else if (error === 'auth/user-not-found') {
            alert('Ups! aún no tienes cuenta, regístrate');
          }
        }
      }); */

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <form className="h-2/5 w-2/5 bg-white flex flex-col m-3 shadow-lg rounded-lg p-4 items-center">
                <h1 className='font-bold p-4 text-xl'>Cafetería</h1>
                <div className='grid grid-cols-2 gap-4 p-7'>
                    <label className='mx-16' for="email">Email: </label>
                    <input type="email" placeholder="Your email"/>
                    <label className='mx-16' for="password">Contraseña: </label>
                    <input type="password" placeholder="Your password"/>
                </div>
                <input type='submit' onChange={(event)=>setInput(event.target.value)} className=" text-center bg-gray-500 hover:bg-blue-700 text-white font-bold rounded w-2/5 p-3 m-4"/>
            </form>
        </div>
    )
}
