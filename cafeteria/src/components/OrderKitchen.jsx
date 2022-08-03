import React from 'react'
import {Cronometro} from './Cronometro'

export function OrderKitchen({ order }) {
    
  return (
    <div className="bg-gray-100 flex flex-col m-4 shadow-lg">
      <header className='flex text-base font-bold justify-between m-3 mb-2'>
        <div className="text-center border-8 border-x-gray-100 h-10 w-10 bg-white shadow-lg rounded-lg">{order.table}</div>
        <Cronometro order={order}/>
      </header>
      <main className="flex flex-col">
        <div className=" w-60 flex flex-col  h-48  rounded bg-white overflow-auto">
        <h1 className="font-bold self-center mb-3">{order.orderId.slice(8, 12)}</h1>
          {order.products.map((product) => (
            <li className="flex justify-between px-3">
              <div>{product.name}</div>
              <div>{product.quantity}</div>
            </li>
          ))}
        </div>
      </main>

      <button className=' bg-gray-500 hover:bg-blue-700  place-content-center text-white font-bold py-2 px-4 m-4 mt-3 rounded justify-self-end'>Delivered</button>

    </div >
  )
}
