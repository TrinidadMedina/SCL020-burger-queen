import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function Login() {

  const MySwal = withReactContent(Swal);
  let navigate = useNavigate();
  const { login } = UserAuth();
  const [email, setEmail] = useState("admin@cafedelbarrio.cl")
  const [password, setPassword] = useState("123456")
  const [profile, setProfile] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (profile == 'cocina') {
        navigate('/Cocina');
      } else {
        navigate('/Salon');
      }

    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          MySwal.fire({
            title: <p>Ingresa un correo válido: ejemplo@hotmail.com</p>
          })
          break
        case 'auth/missing-email':
          MySwal.fire({
            title: <p>Debes ingresar un correo</p>
          })
          break
        case 'auth/internal-error':
          MySwal.fire({
            title: <p>Debes llenar todos los campos</p>
          })
          break
        case 'auth/wrong-password':
          MySwal.fire({
            title: <p>Contraseña incorrecta</p>
          })
          break
        case 'auth/user-not-found':
          MySwal.fire({
            title: <p>Ups! aún no tienes cuenta, regístrate</p>
          })
          break
        default:
      }
    }
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-[#F3F3ED] '>
      < form onSubmit={handleSubmit} className="text-dark-green flex flex-col drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]  bg-[#F3F3ED] rounded-lg items-center p-10" > { /* bg-[#F3F3ED] */}
        <img className='w-2/6 py-2' src="../img/logo.png" alt="" />
        <div className='grid grid-cols-2 gap-4 p-7 h-full w-full'>
          <label className=' text-dark-green font-bold' htmlFor="email">Email: </label>
          <input type="email" className=' shadow appearance-none border-none rounded w-full py-2 px-3' placeholder="Your email" value="admin@cafedelbarrio.cl" onChange={(e) => setEmail(e.target.value)} />
          <label className=' font-bold' htmlFor="password">Contraseña: </label>
          <input type="password" className='shadow appearance-none border-none rounded w-full py-2 px-3' placeholder="Your password" value="123456" onChange={(e) => setPassword(e.target.value)} />
          <input type='submit' value='Cocina' onClick={() => { setProfile('cocina') }} className='bg-dark-green hover:bg-orange-10 text-white  text-center font-bold py-2 px-4 rounded' />
          <input type='submit' value='Salón' onClick={() => { setProfile('salon') }} className='bg-dark-green  hover:bg-orange-10 text-white  text-center font-bold py-2 px-4 rounded' />
        </div>
      </form >
    </div >
  )
}
