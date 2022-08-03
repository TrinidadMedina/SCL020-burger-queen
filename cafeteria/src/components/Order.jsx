import React from 'react'



export function Order({ order }) {




  return (
    <div className="bg-gray-100 m-2 font-bold  text-xl" >
      <header className='flex text-base justify-space-between p-4'>
        Table:{order.table} <br /> #{order.orderId.slice(8, 12)}
        <button className=' bg-gray-500 hover:bg-blue-700  place-content-center text-white font-bold py-2 px-4 m-4 rounded'>Delivered</button>

      </header>

      <div className=" w-60 flex flex-col  h-60   rounded shadow-lg font-bold">
        {order.products.map((product) => (
          <li className="list-none text-left px-2	 font-normal">
            {product.name}
          </li>
        ))}
        {/* <button className=' bg-gray-500 hover:bg-blue-700  place-content-center text-white font-bold py-2 px-4  rounded'>Delivered</button> */}
      </div>
    </div >


  )
}
