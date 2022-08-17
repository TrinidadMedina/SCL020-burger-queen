import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export function Login() {

  const MySwal = withReactContent(Swal)

  let navigate = useNavigate();
  const { login } = UserAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    <div className='flex h-screen w-screen items-center justify-center'>
      <form onSubmit={handleSubmit} className="h-2/5 w-2/5 bg-white flex flex-col m-3 shadow-lg rounded-lg p-4 items-center">
        <h1 className='font-bold p-4 text-xl'>Cafetería</h1>
        <div className='grid grid-cols-2 gap-4 p-7'>
          <label className='mx-16' htmlFor="email">Email: </label>
          <input type="email" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
          <label className='mx-16' htmlFor="password">Contraseña: </label>
          <input type="password" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
          <input type='submit' value='Cocina' onClick={() => { setProfile('cocina') }} className='bg-gray-500  hover:bg-blue-700 text-white  text-center font-bold py-2 px-4 rounded' />
          <input type='submit' value='Salón' onClick={() => { setProfile('salon') }} className='bg-gray-500  hover:bg-blue-700 text-white  text-center font-bold py-2 px-4 rounded' />
        </div>
      </form>
    </div>
  )
}
// catch (error) {
//   console.log(error.code)
//   if (error.code === 'auth/invalid-email') {
//     alert('Ingresa un correo válido: ejemplo@hotmail.com');
//   } else if (error.code === 'auth/missing-email') {
//     alert('Debes ingresar un correo');
//   } else if (error.code === 'auth/internal-error') {
//     alert('Debes llenar todos los campos');
//   } else if (error.code === 'auth/wrong-password') {
//     alert('Contraseña incorrecta');
//   } else if (error.code === 'auth/user-not-found') {
//     alert('Ups! aún no tienes cuenta, regístrate');
//   }
// }
